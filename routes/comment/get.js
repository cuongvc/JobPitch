// du lieu bao gom 1 array cac objectID cua comment

var check_token                           = require('./../../my_module/check_exist').token;
var Comment                               = require('./../../models/comments');

module.exports														=	function(req, res){

	try{
		var data 						=	req.body;

		var user_id         = data.user_id;
		var token           = data.token;
		var comment_ids     = data.comments;
	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success'}));
				res.status(200).end();
			} else{

				Comment.find({_id : {$in : comment_ids} }, function(err, comments){
					if (err){
						console.log(err);
						res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
						res.status(200).end();
					} else{
						res.write(JSON.stringify({error_code : 0, comment : comments}));
						res.status(200).end();
					}
				})

			}
		})
	}

}