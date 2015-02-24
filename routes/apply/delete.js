var check_token = require('./../../my_module/check_exist').token;
var check_app = require('./../../my_module/check_exist').application;
var check_job = require('./../../my_module/check_exist').job;

module.exports = function(req, res) {

    try {
        var data = req.body;

        var user_id = data.user_id;
        var token = data.token;

        var app_id = data.app_id;

    } catch (err) {
        res.write(JSON.stringify({ error_code: 1, msg: err.toString() }));
        res.status(200).end();
    } finally {
        check_token(user_id, token, function(exist, user_exist) {
            if (!exist) {
                res.write(JSON.stringify({ error_code: 1, msg: 'Authenticate is not success' }));
                res.status(200).end();
                return 0;
            } else {

                check_app(app_id, function(exist_, app_exist){
                    if (!exist_){
                        res.write(JSON.stringify({ error_code: 1, msg: 'Application is not exist' }));
                        res.status(200).end();
                        return 0;
                    };

                    if (app_exist.user_id != user){
                        res.write(JSON.stringify({ error_code: 1, msg: 'You have not permission to delete this pitch' }));
                        res.status(200).end();
                        return 0;
                    };

                    app_exist.remove(function(err){
                        if (err){
                            res.write(JSON.stringify({ error_code: 1, msg: err.toString() }));
                            res.status(200).end();
                        }

                    });

                })

            }


        })

    };
};
