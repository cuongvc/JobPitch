var User  										= require('./../../models/users');
var check_token               = require('./../../my_module/check_exist').token;

module.exports								=	function(req, res){
	
	try{
		var user_id    = req.params.user_id;
		
	}

	catch(err){
		res.write(JSON.stringify({ error_code : 1, msg : err.toString() }));
		res.status(200).end();
	}

	finally{
			User.findOne({_id : user_id}, '-local_infor -fb_infor -twitter_infor -linkedin_infor -google_infor -notifications -messages -token', function(err, user){

				if (err){
					res.write(JSON.stringify({ error_code : 1, msg : err.toString() }));
					res.status(200).end();
				} else {
					res.write(JSON.stringify({ error_code : 0, user : user }));
					res.status(200).end();
				}

			})
	}

}