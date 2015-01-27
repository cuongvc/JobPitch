var User           = require('./../../models/users');

// type_acc = 1 : user is Talent
// type_acc = 2 : user is Company
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