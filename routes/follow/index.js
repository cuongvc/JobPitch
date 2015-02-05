var check_token                   = require('./../../my_module/check_exist').token;

var User                          = require('./../../models/users');

module.exports										=	function(req, res){

	try{

		// user_id follow user_id_2
		var data           = req.body;
		
		var user_id        = data.user_id;
		var token          = data.token;
		
		var user_follow_id = data.user_follow_id;
		
}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{

		check_token(user_id, token, function(exist, user_exist){

			if (!exist){

				res.write(JSON.stringify({ error_code : 1, msg : 'Authenticate is not success' }));
				res.status(200).end();

			} else

				User.findOne({_id : user_follow_id}, function(err, user_exist_2){

					if (err){
						res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
						res.status(200).end();
					} else

					if (!user_exist){
						res.write(JSON.stringify({error_code : 1, msg : 'Follow user is not exist'}));
						res.status(200).end();
					} else {

					user_exist.addMyFollow(user_follow_id, function(){
						user_exist_2.addFollowMe(user_id, function(){
							res.write(JSON.stringify({error_code : 0}));
							res.status(200).end();
						})
					})}

				})
		})
	}
}