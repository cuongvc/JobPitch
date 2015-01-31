var fs                        = require('fs-extra');
var domain                    = require('./../../config/default').domain_default;
var resize_small							=	require('./../resize/resize_small');
var resize_normal							=	require('./../resize/resize_normal');

// type : JobImages
// callback(error_exist, error, , image, image_small, image_normal)

module.exports                 = function(temp_path, extension, type, callback){

	var image, image_small, image_normal;

	var file_name   =   Math.floor(Math.random() * 1000000 + 1) + new Date().getTime() + '.' + extension;
  var new_location = '/images/full_size/' + type + '/' ; 

  fs.rename(temp_path, './public' + new_location + file_name, 
  	function(err){
    	if (err){
        console.log(err);
      	callback(1,err, null, null, null);
      } else{
      	image = domain + new_location + file_name;
        resize_small('/images/small_size/', image, type, function(image_link_resize){
        	image_small = image_link_resize;
          resize_normal('/images/normal_size/', image, type, function(image_link_resize){
          	image_normal = image_link_resize;
            callback(0, null, image, image_small, image_normal);
          })
        })
      }
    }
  )  
}