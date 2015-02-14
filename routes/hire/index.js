var check_token  = require('./../../my_module/check_exist').token;
var check_job    = require('./../../my_module/check_exist').job;
var check_app    = require('./../../my_module/check_exist').application;

var Contract     = require('./../../models/contracts');
var User         = require('./../../models/users');

var io_notify    = require('./../../my_module/socket');

var Notification = require('./../../models/notifications');

var content_noti = require('./../../config/content_noti');



module.exports								=	function(req, res){

	try{
		var data = req.body;

		var user_id = data.user_id;
		var token   = data.token;

		var job_id  = data.job_id;
		var app_id  = data.app_id;

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
			} else

				check_job(job_id, function(exist, job_exist){

					if (!exist){
						res.write(JSON.stringify({error_code : 1, msg : 'Job is not exist'}));
						res.status(200).end();
					} else

					if (job_exist.user_id != user_id){
						res.write(JSON.stringify({error_code : 1, msg : 'You have not enough permission to hire'}));
						res.status(200).end();
					} else

						check_app(app_id, function(exist_, app_exist){

							if (!exist_){
								res.write(JSON.stringify({error_code : 1, msg : 'Application is not exist'}));
								res.status(200).end();
							} else {

								app_exist.addHire( );

								var newContract = new Contract();

								newContract.newInfor(app_exist.user_id, user_id, job_id, function(contract){

									user_exist.addContract(contract, function(){

										job_exist.addContract(contract, function(){

											User.findOne({_id : app_exist.user_id}, function(err, talent_exist){

												talent_exist.addContract(contract, function(){

													res.write(JSON.stringify({error_code : 0}));
													res.status(200).end();

	                        var newNotification = new Notification();
	                        newNotification.newInfor(
	                            application_exist.user_id, user_exist.userName, content_noti.interest_application,
	                            application_exist.description, application_exist.job_id, application_exist._id,
	                            '', '', '', user_exist.avatar_small, 22);

	                        var receive_notify = [];
	                        receive_notify.push(application_exist.user_id);
	                        io_notify.emit('hire', {
	                            user_receive_notify: receive_notify,
	                            avatar_user_make_notify : user_exist.avatar_small,
	                            userName_user_make_notify : user_exist.userName,
	                            content : application_exist.description, 
	                            job_id : application_exist.job_id, 
	                            app_id : application_exist._id
	                        });

												})
											})

										})

									});

								});

							}

						})

				})

		})
	}

}