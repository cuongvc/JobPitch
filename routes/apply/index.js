var check_job     = require('./../../my_module/check_exist').job;
var check_token   = require('./../../my_module/check_exist').token;
var Application   = require('./../../models/applications');
var respon_object = require('./../../my_module/respon_object').application;

var io_notify     = require('./../../my_module/socket');
var Notification  = require('./../../models/notifications');


module.exports = function(req, res) {

    try {
        var data = req.body;

        var token = data.token;
        var user_id = data.user_id;
        var job_id = data.job_id;
        var title = data.title;
        var description = data.description;
        var hash_tag = data.hash_tag;
        var time = new Date(new Date().toGMTString()).toJSON();
        var file = data.file;

    } catch (err) {
        res.write(JSON.stringify({
            error_code: 1,
            msg: err.toString()
        }));
        res.status(200).end();
        return 0;
    } finally {
        check_token(user_id, token, function(exist, user_exist) {

            if (!exist) {
                res.write(JSON.stringify({
                    error_code: 1,
                    msg: 'Authenticate is not exist'
                }));
                res.status(200).end();
                return 0;
            } else

            if (user_exist.isUser == 2) {
                res.write(JSON.stringify({
                    error_code: 1,
                    msg: 'Company account cannot apply'
                }));
                res.status(200).end();
            } else

              check_job(job_id, function(exist2, job_exist) {

                if (!exist2) {
                    res.write(JSON.stringify({
                        error_code: 1,
                        msg: 'Job is not exist'
                    }));
                    res.status(200).end();
                    return 0;
                } else {

                    var application = new Application();
                    application.newInfor(user_id, user_exist.userName, user_exist.avatar_small, job_id, title, hash_tag,
                        description, time, file, job_exist.userName, job_exist.user_id,
                        function(application) {

                            // add own of job receive notify
                            var receive_notify = job_exist.receive_notify.concat(job_exist.user_id);
                            for (var i = 0; i < receive_notify.length; i++) {
                                var notification = new Notification();
                                notification.newInfor(receive_notify[i], user_exist.userName,
                                    ' apply job', application.description, job_exist._id,
                                    application._id, '', job_exist.user_id,
                                    job_exist.userName, job_exist.permalink,
                                    user_exist.avatar_small, 12);
                            }


                            io_notify.emit('apply_job', {
                                user_receive_notify: receive_notify,
                                avatar_user_make_notify : user_exist.avatar_small,
                                userName_user_make_notify : user_exist.userName,
                                id_user_make_notify : user_exist._id,
                                content : application.description, 
                                job_id : job_exist._id, app_id : application._id, 
                                app : application
                            });

                            job_exist.addApply(user_id, application._id, function() {
                                user_exist.addApply(application._id, function() {
                                    respon_object(res, application);
                                });
                            });
                        });
                }

            })

        })
    }

}
