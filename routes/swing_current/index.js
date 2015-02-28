var check_token = require('./../../my_module/check_exist').token;

module.exports			=	function(req, res){
	try{
		var data    = req.body;
		
		var user_id = data.user_id;
		var token   = data.token;
		
		var position = data.position;
	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
		return 0;
	}

	finally{
		check_token(user_id, token, function(exist_user, user_exist){

			if (!exist_user){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success'}));
				res.status(200).end();
				return 0;
			};

			console.log(position);
			console.log(user_exist.position);
			user_exist.position = position;
			user_exist.save(function(err){
				if (err){
					console.log(err);
				}
			});

			res.write(JSON.stringify({error_code : 0}));
			res.status(200).end();

		})
	}

}