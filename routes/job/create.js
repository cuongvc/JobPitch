var   formidable    	  = require('formidable'),
      util          		= require('util'),
      fs            		= require('fs-extra'),
      async             = require('async'),
      mime			    		= require('mime');

var resize_small        = require('./../../my_module/resize/resize_small');
var resize_normal       = require('./../../my_module/resize/resize_normal');
var domain              = require('./../../config/default').domain_default;

var check_token         = require('./../../my_module/check_exist').token;
var respon_object       = require('./../../my_module/respon_object').job;

var Job                 = require('./../../models/jobs');

module.exports				=	function(req, res){

  try{
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) { 

      if (err){
      	console.log('Error : ', err);
        res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
        res.status(200).end();
      } else{

        var user_id  			= fields['user_id'];
        var token    			= fields['token'];
        var tagLine  			= fields['tagLine'];
        var tag           = fields['tag'];
        var desc     			= fields['desc'];
        var link_direct   = fields['link_direct'];
        var lat           = fields['lat'];
        var lng           = fields['lng']
        var address       = fields['address'];
        var time          = new Date;

        var image, image_small, image_normal;



        check_token(user_id, token, function(exist, company_exist){
          if (!exist){
            console.log('Authenticate is incorrect');
  	       	res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is incorrect'}));
  	       	res.status(200).end();
            return 0;
          }

          if (company_exist.type_account != 1){
            console.log('Talent cannot create job');
            res.write(JSON.stringify({error_code : 1, msg : 'Talent cannot create job'}));
            res.status(200).end();
            return 0;
          }
          
          async.waterfall([
                
            function(next){
              if (Object.keys(files).length == 0)
                next(null);
              else{
                var temp_path   =   files.image.path;
                var extension   =   mime.extension(files.image.type).toLowerCase();  
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
              var newJob = new Job();
              newJob.newInfor(image, image_small, image_normal, company_exist.id, 
                              tagLine, tag, desc, lat, lng, address, link_direct, time,
                              function(object){
                                console.log(object);
                                respon_object(res, object);
                              }
              ) 
            })
        })
      }
    });

    form.on('error', function(err) {
      console.log(err);
      res.write(JSON.stringify({error_code : 1, msg : err.toString()}));         //  Input is invalid
      res.status(200).end();
    });

    form.on('end', function(fields, files){
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