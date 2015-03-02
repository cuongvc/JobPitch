var check_token = require('./../../my_module/check_exist').token;
var check_job = require('./../../my_module/check_exist').job;

module.exports = function(req, res) {

    try {
        var data = req.body;

        var user_id = data.user_id;
        var token = data.token;

        var job_id = data.job_id;

    } catch (err) {
        res.write(JSON.stringify({ error_code: 1, msg: err.toString() }));
        res.status(200).end();
    } finally {
        check_token(user_id, token, function(exist, user_exist) {
            if (!exist) {
                res.write(JSON.stringify({ error_code: 1, msg: 'Authenticate is not success' }));
                res.status(200).end();
            } else

                check_job(job_id, function(exist_, job_exist) {

                if (!exist_) {
                    res.write(JSON.stringify({ error_code: 1, msg: 'Job is not exist' }));
                    res.status(200).end();
                } else

                if (job_exist.user_id != user_id) {
                    res.write(JSON.stringify({ error_code: 1, msg: 'You have not permisstion to delete this job'}));
                    res.status(200).end();
                } else {

                    job_exist.remove(function(err){
                        if (err){
                            console.log(err);
                            res.write(JSON.stringify({error_code : 1, msg : err.toString()}))
                            res.status(200).end();
                        } else{
                            res.write(JSON.stringify({error_code : 0}))
                            res.status(200).end();

                            user_exist.myJobs.splice(user_exist.myJobs.indexOf(job_id), 1);
                            user_exist.save(function(err){
                            	if (err)
                            		console.log(err);
                            })
                        }
                    });

                }

            });

        })

    };
};
