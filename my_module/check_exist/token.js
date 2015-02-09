var User           = require('./../../models/users');

module.exports				=	function(id, token, callback){
	User.findOne({_id : id}, function(err, object_exist){

		if (err){
			console.log(err);
			callback(0, null);

		} else if (!object_exist){
			callback(0, null);

		} else{
			if (object_exist.token == token){
				callback(1, object_exist);

			} else{
				callback(0, null);
			}
		}
	})
}