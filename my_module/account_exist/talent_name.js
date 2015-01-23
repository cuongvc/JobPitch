var Talent			=	require('./../../models/talents');
module.exports				=	function(talentname, callback){
	Talent.findOne({talentname : talentname}, function(err, object_exist){
		
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