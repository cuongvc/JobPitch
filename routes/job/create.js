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

var content_noti        = require('./../../config/content_noti');

module.exports				=	function(req, res){

  try{
    var data = req.body;

    var user_id  			= data['user_id'];
    var token    			= data['token'];

    var title  			  = data['title'];
    var hash_tag      = data['hash_tag'];
    var tagname       = data['tagname'];
    var desc     			= data['desc'];
    var position      = data.position;

    var time          = new Date(new Date().toGMTString()).toJSON();
    var temp_path     = data['temp_path'];
    var extension     = data['extension'];

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

      async.waterfall([
                
        function(next){

          if(temp_path == ''){
            next(null);
          } else{

            var file_name   =   Math.floor(Math.random() * 1000000 + 1) + new Date().getTime() + '.' + extension;
            var new_location = '/images/full_size/JobImages/'; 
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
        }

      ], function(err){
        // for (var i = 0 ; i < 1000 ; i ++){
        //   console.log('Make new job');
          var newJob = new Job();
          newJob.newInfor(image, image_small, image_normal, user_exist.id, user_exist.userName, 
                  user_exist.tagname, title, hash_tag, tagname, desc,
                  position, link_direct, time, position.country.short_name, 
                  function(job) {



                  job.save(function(err) {
                      user_exist.addJob(job._id);
                      respon_object(res, job);

                     
                      for (var i = 0; i < user_exist.followMes.length; i++) {
                          var notification = new Notification();
                          notification.newInfor(user_exist.followMes[i], user_exist.userName,
                              content_noti.create_job, job.title, job.id, '', '',
                              job.user_id, job.userName, job.permalink,
                              user_exist.avatar_small, 11);
                      }


                      io_notify.emit('create_job', {
                          user_receive_notify: user_exist.followMes,
                          avatar_user_make_notify: user_exist.avatar_small,
                          userName_user_make_notify: user_exist.userName,
                          id_user_make_notify: user_exist._id,
                          content: job.title,
                          job_id: job._id,
                          job: job,
                          userName_own_job : user_exist.userName,
                          userTagName : user_exist.tagname
                      });

                  })
              }
          )

        // }
      })
    })
  }

  catch(err){
    res.write(JSON.stringify({error_code : 1, msg : err.toString()}));             //  Input is invalid
    res.status(200).end();
  }

  finally{
  	console.log('finally');
  }
}	