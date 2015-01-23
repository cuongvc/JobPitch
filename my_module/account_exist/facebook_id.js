module.exports				=	function(Model, fb_id, callback){
	Model.findOne({'fb_infor.id' : fb_id}, function(err, object_exist){
		
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