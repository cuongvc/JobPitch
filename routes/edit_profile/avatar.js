var fs          		= require('fs-extra');

var check_token 		= require('./../../my_module/check_exist').token;
var domain      		= require('./../../config/default').domain_default;

var resize_normal   = require('./../../my_module/resize/resize_normal');
var resize_small    = require('./../../my_module/resize/resize_small');

module.exports			=	function(req, res){

	try{
		var data       = req.body;
		
		var user_id    = data.user_id;
		var token      = data.token;
		var type_image = data.type_image;
		var temp_path  = data.temp_path;
		var extension  = data.extension;

		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
        res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success'}));
				res.status(200).end();
				return 0;
			}

      var file_name   =   Math.floor(Math.random() * 1000000 + 1) + new Date().getTime() + '.' + extension;
      var new_location = '/images/full_size/UserImages/'; 
      
      console.log('temp_path : ', temp_path);
      fs.rename(temp_path, './public' + new_location + file_name,  function(err){
        if (err){
        	console.log(err);
        	res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
					res.status(200).end();
					return 0;
				}

        image = domain + new_location + file_name;
				resize_small('/images/small_size/', image, 'UserImages', function(image_link_small){
	        image_small = image_link_small;
	        resize_normal('/images/normal_size/', image, 'UserImages', function(image_link_normal){
          	image_normal = image_link_normal;
                  
            if (type_image == 1){
            	user_exist.avatar = image;
	            user_exist.avatar_small = image_small;
	            user_exist.avatar_normal = image_normal;
	            user_exist.save(function(err){
	            	res.write(JSON.stringify({error_code : 0}));
	              res.status(200).end();
	              return 0;
	            })	
            } 

            else if (type_image == 2){
            	user_exist.cover = image;
	            user_exist.cover_small = image_small;
	            user_exist.cover_normal = image_normal;
	            user_exist.save(function(err){
	            	res.write(JSON.stringify({error_code : 0}));
	              res.status(200).end();
	              return 0;
	            })	
            }

          })
        })
      })  
		})
	}

	catch(err){	
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}
}