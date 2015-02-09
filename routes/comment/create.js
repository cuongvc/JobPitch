var check_token                   = require('./../../my_module/check_exist').token;
var Comment                       = require('./../../models/comments');
var Application                   = require('./../../models/applications');

module.exports										=	function(req, res){

	try{
		var data = req.body;
		
		var user_id            = data.user_id;
		var token              = data.token;
		var content            = data.content;
		var hash_tag           = data.hash_tag;
		var application_parent = data.application_parent;
		var comment_parent     = data.comment_parent;
	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success' }));
				res.status(200).end();
			} else{

				var newComment   = new Comment();
				newComment.newInfor(user_exist._id, user_exist.userName, user_exist.avatar_normal, application_parent, 
														comment_parent, content, hash_tag, 
														function(comment){
					comment.save(function(err){
						console.log(err);
					});
					if (application_parent != ''){
						console.log('APPLICATION');
						Application.findOne({_id : application_parent}, function(err, app_exist){

							if (err){
								res.write(JSON.stringify({error_code : 1, msg : err.toString}));
								res.status(200).end();
								return 1;
							};

							if (!app_exist){
								res.write(JSON.stringify({error_code : 1, msg : 'Application is not exist' }));
								res.status(200).end();
								return 1;
							} else{
								app_exist.addComment(comment._id, function(){
									res.write(JSON.stringify({error_code : 0, comment : comment }));
									res.status(200).end();
								});
							}
						});

					};

					if (comment_parent != ''){
						console.log('COMMENT');

						Comment.findOne({_id : comment_parent}, function(err, cmt_exist){
							if (err){
								res.write(JSON.stringify({error_code : 1, msg : err.toString}));
								res.status(200).end();
								return 1;
							};

							if (!cmt_exist){
								res.write(JSON.stringify({error_code : 1, msg : 'Comment is not exist' }));
								res.status(200).end();
								return 1;
							} else{

							cmt_exist.addComment(comment._id, function(){
								res.write(JSON.stringify({error_code : 0, comment : comment }));
								res.status(200).end();
							});

							}
						});
					};
				})
			}
		})
	}
}