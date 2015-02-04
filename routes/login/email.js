var User                    = require('./../../models/users');
var check_user              = require('./../../my_module/check_exist').user;
var respon_object           = require('./../../my_module/respon_object').user;

module.exports							=	function(req, res){

	try{
		var data								=	req.body;

		var email               = data.email; 
		var password						=	data.password;
	}

	catch(err){
		res.write(JSON.stringify({ error_code : 1, msg : err.toString() }));
		res.status(200).end();
	}

	finally{
		check_user(email, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Email is incorrect'}));
				res.status(200).end();
				return 1;
			}
			
			if ( user_exist.validPassword(password) ){

				req._passport.session.user = user_exist._id;

				respon_object(1, res, user_exist);
			} else{
				res.write(JSON.stringify({error_code : 1, msg : 'Password is incorrect'}));
				res.status(200).end();
			}
		})
	}
}