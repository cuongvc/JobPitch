var   fs                = require('fs-extra'),
      async             = require('async'),
      mime			    		= require('mime');

var resize_small        = require('./../../my_module/resize/resize_small');
var resize_normal       = require('./../../my_module/resize/resize_normal');
var domain              = require('./../../config/default').domain_default;

var check_token         = require('./../../my_module/check_exist').token;
var respon_object       = require('./../../my_module/respon_object').job;
var check_job           = require('./../../my_module/check_exist').job;

var Job                 = require('./../../models/jobs');

module.exports				=	function(req, res){

  try{
    var data = req.body;

    
    var user_id       = data['user_id'];
    var token         = data['token'];
    var job_id        = data['job_id'];

    var title         = data['title'];
    var hash_tag      = data['hash_tag'];
    var tagname       = data['tagname'];
    var desc          = data['desc'];
    var link_direct   = data['link_direct'];

    var lat           = data.position['lat'];
    var lng           = data.position['lng']
    var address       = data.position['formatted_address'];
    var city          = data.position['city'].long_name;
    var country       = data.position['country'].long_name;
    var state         = data.position['state'].long_name;

    var time          = new Date(new Date().toGMTString()).toJSON();
    var temp_path     = data['temp_path'];
    var extension     = data['extension'];

    var image = '', image_small = '', image_normal = '';
        
    check_token(user_id, token, function(exist, user_exist){
      if (!exist){
  	    res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is incorrect'}));
  	    res.status(200).end();
        return 0;
      }

      check_job(job_id, function(exist2, job_exist){

        if (!exist2){
          res.write(JSON.stringify({error_code : 1, msg : 'Job is not exist'}));
          res.status(200).end();
          return 1;
        }

        if (job_exist.user_id != user_id){
          res.write(JSON.stringify({error_code : 1, msg : 'You have not permisstion to edit this job'}));
          res.status(200).end();
          return 1;
        }
           
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
                })  
              }
          }
        ], function(err){

          job_exist.editInfor(image, image_small, image_normal, user_exist.id, user_exist.userName,
                            title, hash_tag, tagname, desc, lat, lng, address, city, country, state, link_direct, time,
                            function(job){
                              job.save(function(err){
                                if (err)
                                  console.log(err);
                                respon_object(res, job);  
                              })
                              
                            }
          ) 
        })
      })
    })
  }

  catch(err){
    res.write(JSON.stringify({error_code : 201, msg : err.toString()}));             //  Input is invalid
    res.status(200).end();
  }

}	