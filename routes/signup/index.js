var User											=	require('./../../models/users');
var check_user                = require('./../../my_module/check_exist').user;
var respon_object             = require('./../../my_module/respon_object').user;

var Permalink                 = require('./../../models/permalinks');

module.exports								=	function(req, res){

	try{
		var data									=	req.body;

		var user_name 						=	data.user_name;
		var isUser      				  = data.isUser;
		var email                 = data.email;
		var password              = data.password;
	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{
		check_user(email, function(exist, user_exist){

			if (exist){
				res.write(JSON.stringify({error_code : 1, msg : "User is really exist"}));
				res.status(200).end();
			} else{
				var newUser = new User();
				newUser.newInforLc(user_name, email, password, isUser, function(user){

					req._passport.session.user = user._id;

        	respon_object(1, res, user);
				})
			}
		})
	}
}