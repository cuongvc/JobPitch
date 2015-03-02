var User  										= require('./../../models/users');
var check_token               = require('./../../my_module/check_exist').token;

module.exports								=	function(req, res){
	
	try{
		var data    = req.body;
		
		var user_id = data.user_id;
		var token   = data.token;
		
		var users   = data.users;
	}

	catch(err){
		res.write(JSON.stringify({ error_code : 1, msg : err.toString() }));
		res.status(200).end();
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({ error_code : 1, msg : 'Authenticate is not success' }));
				res.status(200).end();
			} else

			User.find({_id : {$in : users}}, 'userName avatar avatar_small avatar_normal followMes myJobs', function(err, users){

				if (err){
					res.write(JSON.stringify({ error_code : 1, msg : err.toString() }));
					res.status(200).end();
				} else {
					res.write(JSON.stringify({ error_code : 0, users : users }));
					res.status(200).end();
				}

			})

		})
	}

}