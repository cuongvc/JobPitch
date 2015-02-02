var   formidable    	  = require('formidable'),
      util          		= require('util'),
      fs            		= require('fs-extra'),
      async             = require('async'),
      url               = require('url'),
      mime			    		= require('mime');

module.exports				=	function(req, res){

  try{
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) { 
      var x = fields['x'];
      var y = fields['y'];
      var width = fields['width'];
      var height = fields['height'];

      if (err){
      	console.log('Error : ', err);
        res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
        res.status(200).end();
      } else{

        if (Object.keys(files).length == 0)
          next(null);
        else{
          var temp_path   =   files.image.path;
          var extension   =   mime.extension(files.image.type).toLowerCase();  

          var im     = require('imagemagick');
          if (process.argv[3] == 'cuong'){
            console.log('Dev with Cuong');
            var gm = require('gm');
          } else
            var gm = require('gm').subClass({ imageMagick: true });     // gm with server

          gm(temp_path)
            .crop(width, height, x, y)
            .autoOrient()
            .write(temp_path, function (err) {
              if (err) {
                console.log('Error : ', err);
              }
              else{
                console.log('CROP SUCCESS');
                res.write(JSON.stringify({error_code : 0, path : temp_path, extension : extension}));
                res.status(200).end();
              }
          })
            
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
  	console.log('finally');
  }
}	