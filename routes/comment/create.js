var check_token                   = require('./../../my_module/check_exist').token;
var Comment                       = require('./../../models/comments');
var Application                   = require('./../../models/applications');

var Notification                  = require('./../../models/notifications');

var io_notify           = require('./../../my_module/socket');
var content_noti                  = require('./../../config/content_noti');

module.exports										=	function(req, res){

	try{
		var data = req.body;
		
		var user_id            = data.user_id;
		var token              = data.token;
		var content            = data.content;
		var hash_tag           = data.hash_tag;
		var application_parent = data.application_parent;
		var comment_parent     = data.comment_parent;
		var job_parent         = data.job_parent;
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
														comment_parent, job_parent, content, hash_tag, 
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

                  var notification = new Notification();
                  notification.newInfor(app_exist.user_id, user_exist.userName,
                                	content_noti.comment_apply1, comment.content, 
                                	comment.job_parent, '', comment._id,
                                	'', '', comment.permalink,
                                	user_exist.avatar_small, 25);
                  var user_receive_notify = [];
                  user_receive_notify.push(app_exist.user_id);
                  io_notify.emit('comment_apply', { user_receive_notify: user_receive_notify,
									                                avatar_user_make_notify : user_exist.avatar_small,
									                                userName_user_make_notify : user_exist.userName,
									                                id_user_make_notify : user_exist._id,
									                                content : comment.description, 
									                                job_id : comment.job_parent, 
									                                app_id : comment.application_parent, 
									                                comment_id : comment._id,
									                                comment : comment
                  });

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

	                var notification = new Notification();
	                notification.newInfor(cmt_exist.user_id, user_exist.userName,
	                                	content_noti.comment_comment1, comment.content, 
	                                	comment.job_parent, '', comment._id,
	                                	'', '', comment.permalink,
	                                	user_exist.avatar_small, 25);
	                var user_receive_notify = [];
	                user_receive_notify.push(cmt_exist.user_id);

                  io_notify.emit('comment_comment', { user_receive_notify: user_receive_notify,
									                                avatar_user_make_notify : user_exist.avatar_small,
									                                userName_user_make_notify : user_exist.userName,
									                                content : comment.description, 
									                                job_id : comment.job_parent, 
									                                app_id : comment.application_parent, 
									                                comment_id : comment._id
                  });

								});

							}
						});
					};
				})
			}
		})
	}
}