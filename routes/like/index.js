var check_token = require('./../../my_module/check_exist').token;

var Job = require('./../../models/jobs');
var Application = require('./../../models/applications');
var Comment = require('./../../models/comments');
var io_notify = require('./../../my_module/socket');
var Notification = require('./../../models/notifications');

var content_noti = require('./../../config/content_noti');


module.exports = function(req, res) {

    try {
        var data = req.body;

        var user_id = data.user_id;
        var token = data.token;

        // type_like = 1-job, 2-application, 3-comment
        var type_like = data.type_like;
        var job_id = data.job_id;
        var application_id = data.application_id;
        var comment_id = data.comment_id;

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
            } else {

                // == LIKE JOB ==
                if (type_like == 1) {
                    Job.findOne({
                        _id: job_id
                    }, function(err, job_exist) {
                        if (err) {
                            res.write(JSON.stringify({
                                error_code: 1,
                                msg: err.toString()
                            }));
                            res.status(200).end();
                        } else

                        if (!job_exist) {
                            res.write(JSON.stringify({
                                error_code: 1,
                                msg: 'Job is not exist'
                            }));
                            res.status(200).end();
                        } else {
                            var notification = new Notification();
                            notification.newInfor(job_exist.user_id, user_exist.userName,
                                content_noti.like_job1, job_exist.title, job_exist.id, '', '',
                                job_exist.user_id, job_exist.userName, job_exist.permalink,
                                user_exist.avatar_small, 13);
                            var user_receive_notify = [];
                            user_receive_notify.push(job_exist.user_id);
                            io_notify.emit('like_job', {
                                user_receive_notify: user_receive_notify,
                                job: job_exist
                            });

                            job_exist.addLike(user_exist._id, function() {
                                res.write(JSON.stringify({
                                    error_code: 0
                                }));
                                res.status(200).end();
                            });
                        }

                    })
                }

                // == LIKE APPLICATION ==
                if (type_like == 2) {
                    Application.findOne({
                        _id: application_id
                    }, function(err, app_exist) {
                        console.log(app_exist);
                        if (err) {
                            res.write(JSON.stringify({
                                error_code: 1,
                                msg: err.toString()
                            }));
                            res.status(200).end();
                        } else

                        if (!app_exist) {
                            res.write(JSON.stringify({
                                error_code: 1,
                                msg: 'Application is not exist'
                            }));
                            res.status(200).end();
                        } else {
                            var notification = new Notification();
                            notification.newInfor(app_exist.user_id, user_exist.userName,
                                content_noti.like_apply1, app_exist.description, app_exist.job_id, app_exist._id, '',
                                app_exist.user_id, app_exist.userName, app_exist.permalink,
                                user_exist.avatar_small, 23);
                            var user_receive_notify = [];
                            user_receive_notify.push(app_exist.user_id);
                            io_notify.emit('like_app', {
                                user_receive_notify: user_receive_notify,
                                app: app_exist
                            });
                            app_exist.addLike(user_exist._id, function() {
                                res.write(JSON.stringify({
                                    error_code: 0
                                }));
                                res.status(200).end();
                            });
                        }

                    })
                }


                // == LIKE COMMENT ==
                if (type_like == 3) {
                    Comment.findOne({
                        _id: comment_id
                    }, function(err, comment_exist) {
                        console.log(comment_exist);
                        if (err) {
                            res.write(JSON.stringify({
                                error_code: 1,
                                msg: err.toString()
                            }));
                            res.status(200).end();
                        } else

                        if (!comment_exist) {
                            res.write(JSON.stringify({
                                error_code: 1,
                                msg: 'Comment is not exist'
                            }));
                            res.status(200).end();
                        } else {
                            var notification = new Notification();
                            notification.newInfor(comment_exist.user_id, user_exist.userName,
                                content_noti.like_comment1, comment_exist.content, 
                                comment_exist.job_parent, '', comment_exist._id,
                                comment_exist.user_id, comment_exist.userName, comment_exist.permalink,
                                user_exist.avatar_small, 31);
                            var user_receive_notify = [];
                            user_receive_notify.push(comment_exist.user_id);
                            io_notify.emit('like_comment', {
                                user_receive_notify: user_receive_notify,
                                comments: comment_exist
                            });
                            comment_exist.addLike(user_exist._id, function() {
                                res.write(JSON.stringify({
                                    error_code: 0
                                }));
                                res.status(200).end();
                            });
                        }

                    })
                }

            }

        })
    }

}
