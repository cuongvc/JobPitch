var   fs                = require('fs-extra'),
      async             = require('async'),
      mime			    		= require('mime');

var resize_small        = require('./../../my_module/resize/resize_small');
var resize_normal       = require('./../../my_module/resize/resize_normal');
var domain              = require('./../../config/default').domain_default;

var check_token         = require('./../../my_module/check_exist').token;
var respon_object       = require('./../../my_module/respon_object').job;

var Job                 = require('./../../models/jobs');

var io_notify           = require('./../../my_module/socket');

var Notification        = require('./../../models/notifications');
var Permalink           = require('./../../models/permalinks');

module.exports				=	function(req, res){

  try{
    var data = req.body;

    var user_id  			= data['user_id'];
    var token    			= data['token'];
    var title  			  = data['title'];
    var hash_tag      = data['hash_tag'];
    var desc     			= data['desc'];
    var link_direct   = data['link_direct'];
    var lat           = data['lat'];
    var lng           = data['lng']
    var address       = data['address'];
    var time          = new Date(new Date().toGMTString()).toJSON();
    var temp_path     = data['temp_path'];
    var extension     = data['extension'];

    var skype         = data.skype;
    var phone         = data.phone;
    var companyEmail  = data.companyEmail;


    var image, image_small, image_normal;

    check_token(user_id, token, function(exist, user_exist){
      if (!exist){
        console.log('Authenticate is incorrect');
  	    res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is incorrect'}));
  	    res.status(200).end();
        return 0;
      } else

      if (user_exist.isUser == 1){
        console.log('Talent cannot create job');
        res.write(JSON.stringify({error_code : 1, msg : 'Talent cannot create job'}));
        res.status(200).end();
        return 0;
      } else

      //  VERIFY
          
      // if (!user_exist.verify && (skype == '' || phone == '' || companyEmail == '' ||
      //     typeof(skype) == 'undefined' || typeof(phone) == 'undefined' || typeof(companyEmail) == 'undefined')){
      //   console.log('Account need verify');
      //   res.write(JSON.stringify({error_code : 1, msg : 'Account need verify'}));
      //   res.status(200).end();
      // } else

      async.waterfall([
                
        function(next){

          if(temp_path == ''){
            next(null);
          } else{

            var file_name   =   Math.floor(Math.random() * 1000000 + 1) + new Date().getTime() + '.' + extension;
            var new_location = '/images/full_size/JobImages/'; 
            console.log('temp_path : ', temp_path);
            fs.rename(temp_path, './public' + new_location + file_name, 
              function(err){
                if (err){
                  console.log('Err : ', err);
                  res.write(JSON.stringify({error_code : 1, msg : err.toString()}));     
                  res.status(200).end()
                } else{
                  image = domain + new_location + file_name;
                  resize_small('/images/small_size/', image, 'JobImages', function(image_link_resize){
                    image_small = image_link_resize;
                    resize_normal('/images/normal_size/', image, 'JobImages', function(image_link_resize){
                      image_normal = image_link_resize;
                      next(null);
                    })
                  })
                }
              }
            )  
          }
        },

        function(next){
          if (skype != '' && phone != '' && companyEmail != ''){
            user_exist.Verify(skype, phone, companyEmail, function(){
              next(null);
            })
          } else
              next(null);
        }

      ], function(err){
        var newJob = new Job();
        newJob.newInfor(image, image_small, image_normal, user_exist.id, user_exist.userName, title, 
                        hash_tag, desc, lat, lng, address, link_direct, time, 
                        function(job){

                          job.save(function(err){
                            user_exist.addJob(job._id);
                            respon_object(res, job);

                            for (var i = 0 ; i < user_exist.followMes.length ; i ++){
                              var notification = new Notification();
                              notification.newInfor(user_exist.followMes[i], user_exist.userName, 
                                                    ' create new job', job.title, job.id, '', 
                                                    job.user_id, job.userName, job.permalink, 
                                                    user_exist.avatar_small, 11);
                            }


                            io_notify.emit('create_job', {user_receive_notify : user_exist.followMes,
                                                          job                 : job});

                            })
                        }
        ) 
      })
    })
  }

  catch(err){
    res.write(JSON.stringify({error_code : 201, msg : err.toString()}));             //  Input is invalid
    res.status(200).end();
  }

  finally{
  	console.log('finally');
  }
}	