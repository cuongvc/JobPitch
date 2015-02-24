var check_token = require('./../../my_module/check_exist').token;
var check_app = require('./../../my_module/check_exist').application;
var check_job = require('./../../my_module/check_exist').job;

module.exports = function(req, res) {

    try {
        var data    = req.body;
        var user_id = data.user_id;
        var token   = data.token;
        
        var app_id  = data.app_id;

    } catch (err) {
        res.write(JSON.stringify({ error_code: 1, msg: err.toString() }));
        res.status(200).end();
    } finally {
        check_token(user_id, token, function(exist, user_exist) {
            if (!exist) {
                res.write(JSON.stringify({ error_code: 1, msg: 'Authenticate is not success' }));
                res.status(200).end();
                return 0;
            }

            check_app(app_id, function(exist_, app_exist){
                if (!exist_){
                    res.write(JSON.stringify({ error_code: 1, msg: 'Application is not exist' }));
                    res.status(200).end();
                    return 0;
                };

                if (app_exist.user_id != user_id){
                    res.write(JSON.stringify({ error_code: 1, msg: 'You have not permission to delete this pitch' }));
                    res.status(200).end();
                    return 0;
                };

                var job_id = app_exist.job_id;

                app_exist.remove(function(err){
                    if (err){
                        res.write(JSON.stringify({ error_code: 1, msg: err.toString() }));
                        res.status(200).end();
                        return 0;
                    }
                    
                    res.write(JSON.stringify({ error_code: 0}));
                    res.status(200).end();

                    check_job(app_exist.job_id, function(exist, job_exist){
                        if (!exist){
                            console.log('Job of Pitch is not exist');
                            return 0;
                        };

                        job_exist.applications.list.splice(job_exist.applications.list.indexOf(app_id), 1);
                        job_exist.applications.number --;
                        job_exist.save(function(err){
                            if (err){
                                console.log(err);
                            }
                        });

                        user_exist.myApplications.splice(user_exist.myApplications.indexOf(app_id), 1);
                        user_exist.save(function(err){
                            if (err){
                                console.log(err);
                            }
                        })

                    })

                });
            })
        })
    };
};
