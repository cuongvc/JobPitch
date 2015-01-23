var Talent            = require('./../../models/talents');
var Company           = require('./../../models/companys');

// type_acc = 1 : user is Talent
// type_acc = 2 : user is Company
module.exports				=	function(type_acc, id, token, callback){

	if (type_acc == 1)
			var Model = Talent;
	else
			var Model = Company;

	Model.findOne({_id : id}, function(err, object_exist){

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