var check_job                      = require('./../../my_module/check_exist').job;
var check_token                    = require('./../../my_module/check_exist').token;
var Application                    = require('./../../models/applications');
var respon_object                  = require('./../../my_module/respon_object').application;

module.exports				=	function(req, res){

	try{
		var data 					=	req.body;

		var token         = data.token;
		var user_id       = data.user_id;
		var job_id        = data.job_id;
		var title         = data.title;
		var description   = data.description;
		var hash_tag      = data.hash_tag;
    var time          = new Date(new Date().toGMTString()).toJSON();
    var file          = data.file;

    console.log(token, user_id, job_id, title, description, hash_tag, time, file);
	}

	catch(err){
		res.write( JSON.stringify({error_code : 1, msg : err.toString()}) );
		res.status(200).end();
		return 0;
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not exist'}));
				res.status(200).end();
				return 0;
			} else
				check_job(job_id, function(exist2, job_exist){

					if (!exist2){
						res.write(JSON.stringify({error_code : 1, msg : 'Job is not exist'}));
						res.status(200).end();
						return 0;
					} else{
						var application = new Application();
						application.newInfor(user_id, user_exist.userName, user_exist.avatar_small, job_id, title, hash_tag, 
							                   description, time, file, function(application){

							job_exist.addApply(application._id, function(){
								user_exist.addApply(application._id, function(){
									respon_object(res, application);		
								});	
							});			
						});
					}

				})

		})
	}

}