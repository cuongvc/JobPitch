var Users			=	require('./../../models/users');

module.exports				=	function(userName, callback){
	Users.findOne({userName : userName}, function(err, object_exist){
		
		if (err){
			console.log('Error : ', err.toString());
			callback(0, null);

		} else{

			if (!object_exist){
				callback(0, null);

			} else{
				callback(1, object_exist);
			}
		}
	})
}