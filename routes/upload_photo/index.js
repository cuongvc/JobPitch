var   formidable    	  = require('formidable'),
      util          		= require('util'),
      fs            		= require('fs-extra'),
      async             = require('async'),
      mime			    		= require('mime');

module.exports				=	function(req, res){

  try{
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) { 

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
          res.json({error_code : 0, path : temp_path, extension : extension});
          res.status(200).end();
        }
      };
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