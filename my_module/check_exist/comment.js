var Comment           = require('./../../models/comments');

module.exports				=	function(cmt_id, callback){

	Comment.findOne({_id : cmt_id}, function(err, comment_exist){

		if (err){
			console.log(err);
			callback(0, null);

		} else if (!comment_exist){
			callback(0, null);

		} else{
				callback(1, comment_exist);
		}
		
	})
}