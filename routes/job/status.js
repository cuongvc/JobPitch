var check_token = require('./../../my_module/check_exist').token;
var check_job = require('./../../my_module/check_exist').job;

var io_notify = require('./../../my_module/socket');

var Notification = require('./../../models/notifications');


module.exports = function(req, res) {

    try {
        var data = req.body;

        var user_id = data.user_id;
        var token = data.token;

        var job_id = data.job_id;
        var status = data.status;

    } catch (err) {
        res.write(JSON.stringify({
            error_code: 1,
            msg: err.toString()
        }));
        res.status(200).end();
    } finally {
        check_token(user_id, token, function(exist, user_exist) {
            if (!exist) {
                res.write(JSON.stringify({
                    error_code: 1,
                    msg: 'Authenticate is not success'
                }));
                res.status(200).end();
            } else

                check_job(job_id, function(exist_, job_exist) {

                if (!exist_) {
                    res.write(JSON.stringify({
                        error_code: 1,
                        msg: 'Job is not exist'
                    }));
                    res.status(200).end();
                } else

                if (job_exist.user_id != user_id) {
                    res.write(JSON.stringify({
                        error_code: 1,
                        msg: 'You have not permisstion to change status of this job'
                    }));
                    res.status(200).end();
                } else

                    job_exist.changeStatus(status, function() {

	                    res.write(JSON.stringify({ error_code: 0 }));
	                    res.status(200).end();

	                    for (var i = 0; i < job_exist.receive_notify.length; i++) {
	                        var newNotification = new Notification();
	                        newNotification.newInfor(
	                            job_exist.receive_notify[i], user_exist.userName, 'change status job',
	                            job_exist.description, job_exist._id, '', '', job_exist.user_id,
	                            job_exist.userName, job_exist.permalink, user_exist.avatar_small, 15);
	                    };

	                    io_notify.emit('change_status_job', {
	                        user_receive_notify: job_exist.receive_notify,
	                        job: job_exist
	                    });

                		})

            });

        })

    };
};
