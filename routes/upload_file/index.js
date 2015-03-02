var   formidable    	  = require('formidable'),
      util          		= require('util'),
      fs            		= require('fs-extra'),
      async             = require('async'),
      mime			    		= require('mime');


var domain              = require('./../../config/default').domain_default;

module.exports				=	function(req, res){

  try{
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/upload";

    form.parse(req, function(err, fields, files) { 

      if (err){
      	console.log('Error : ', err);
        res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
        res.status(200).end();
      } else{

        if (Object.keys(files).length == 0)
          next(null);
        else{
          var temp_path   =   files.file.path;
          var extension   =   mime.extension(files.file.type).toLowerCase();  

          console.log(extension);
          
          var file_name   =   Math.floor(Math.random() * 1000000 + 1) + new Date().getTime() + '.' + extension;
          var new_location = '/files/'; 

          fs.rename(temp_path, './public' + new_location + file_name, 
            function(err){
              if (err){
                console.log('Err : ', err);
                res.write(JSON.stringify({error_code : 1, msg : err.toString()}));     
                res.status(200).end()
              } else{
                file = domain + new_location + file_name;
                res.write(JSON.stringify({error_code : 0, file : file}));     
                res.status(200).end()
              }
            }
          );  
        }
      };
    });

    form.on('error', function(err) {
      console.log(err);
      res.write(JSON.stringify({error_code : 1, msg : err.toString()}));       
      res.status(200).end();
    });

    form.on('end', function(fields, files){
    })
  }

  catch(err){
    res.write(JSON.stringify({error_code : 1, msg : err.toString()}));         
    res.status(200).end();
  }

  finally{
  }
}	