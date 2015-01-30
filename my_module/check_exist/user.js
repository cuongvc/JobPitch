var User           = require('./../../models/users');

module.exports				=	function(email, callback){

	User.findOne({email : email}, function(err, object_exist){

		if (err){
			console.log(err);
			callback(0, null);

		} else if (!object_exist){
			callback(0, null);

		} else{
				callback(1, object_exist);
		}
		
	})
}