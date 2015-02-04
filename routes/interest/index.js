var check_token           = require('./../../my_module/check_exist').token;	
var check_application     = require('./../../my_module/check_exist').application;	

module.exports 						=	function(req, res){

	try{
		var data 					=	req.body;
		
		var user_id       = data.user_id;
		var token         = data.token;

		var app_id        = data.app_id;

	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success'}));
				res.status(200).end();
			}  else

			if (user_exist.isUser == 1){
				res.write(JSON.stringify({error_code : 1, msg : 'Talent cannot interest'}));
				res.status(200).end();
			} else

			// if (!user_exist.verify){
			// 	res.write(JSON.stringify({error_code : 1, msg : 'Please verify your account'}));
			// 	res.status(200).end();
			// } else

				check_application(app_id, function(exist_, application_exist){

					if (!exist){
						res.write(JSON.stringify({error_code : 1, msg : 'Application is not exist'}));
						res.status(200).end();
					} else

						application_exist.addInterest(user_id, function(){
							res.write(JSON.stringify({error_code : 0}));
							res.status(200).end();
						});

				})

		})
	}	

}