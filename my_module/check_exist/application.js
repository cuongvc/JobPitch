var Application       = require('./../../models/applications');

module.exports  = function(app_id, callback){
	Application.findOne({_id : app_id }, function(err, app_exist){
		if (err || !app_exist){
			console.log(err);
			callback(0, null);
			return 0;
		}
		callback(1, app_exist);
	})
}