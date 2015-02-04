var check_token                   = require('./../../my_module/check_exist').token;

var Job                           = require('./../../models/jobs');
var Application                   = require('./../../models/applications');
var Comment                       = require('./../../models/comments');



module.exports										=	function(req, res){

	try{
		var data 						=	req.body;

		var user_id         = data.user_id;
		var token           = data.token;

		// type_like = 1-job, 2-application, 3-comment
		var type_like       = data.type_like;
		var job_id          = data.job_id;
		var application_id  = data.application_id;
		var comment_id      = data.comment_id;

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

				// == LIKE JOB ==
				if (type_like == 1){
					Job.findOne({_id : job_id}, function(err, job_exist){
						console.log(job_exist);
						if (err){
							res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
							res.status(200).end();
						} else

						if (!job_exist) {
							res.write(JSON.stringify({error_code : 1, msg : 'Job is not exist'}));
							res.status(200).end();
						} else
						
						job_exist.addLike(user_exist._id, function(){
							res.write(JSON.stringify({error_code : 0}));
							res.status(200).end();
						});

					})
				}

				// == LIKE APPLICATION ==
				if (type_like == 2){
					Application.findOne({_id : application_id}, function(err, app_exist){
						console.log(app_exist);
						if (err){
							res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
							res.status(200).end();
						} else

						if (!app_exist) {
							res.write(JSON.stringify({error_code : 1, msg : 'Application is not exist'}));
							res.status(200).end();
						} else
						
						app_exist.addLike(user_exist._id, function(){
							res.write(JSON.stringify({error_code : 0}));
							res.status(200).end();
						});

					})

				}


				// == LIKE COMMENT ==
				if (type_like == 3){
					Comment.findOne({_id : comment_id}, function(err, comment_exist){
						console.log(comment_exist);
						if (err){
							res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
							res.status(200).end();
						} else

						if (!comment_exist) {
							res.write(JSON.stringify({error_code : 1, msg : 'Comment is not exist'}));
							res.status(200).end();
						} else
						
						comment_exist.addLike(user_exist._id, function(){
							res.write(JSON.stringify({error_code : 0}));
							res.status(200).end();
						});

					})
				}

			}

		})
	}

}