var check_token = require('./../../my_module/check_exist').token;
var check_app = require('./../../my_module/check_exist').application;
var check_job = require('./../../my_module/check_exist').job;
var check_cmt = require('./../../my_module/check_exist').comment;


module.exports = function(req, res) {

    try {
        var data    = req.body;
        var user_id = data.user_id;
        var token   = data.token;
        
        var cmt_id  = data.cmt_id;

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

            check_cmt(cmt_id, function(exist_cmt, cmt_exist){
                if (!exist_cmt){
                    res.write(JSON.stringify({ error_code: 1, msg: 'Comment is not exist' }));
                    res.status(200).end();
                    return 0;
                }

                if (cmt_exist.user_id != user_id){
                    res.write(JSON.stringify({ error_code: 1, msg: 'You have not permission to delete this pitch' }));
                    res.status(200).end();
                    return 0;
                }

                cmt_exist.remove(function(err){
                    if (err){
                        console.log(err);
                        return 0;
                    }

                    check_app(cmt_exist.application_parent, function(exist_app, app_exist){
                        if (!exist_app){
                            res.write(JSON.stringify({ error_code: 1, msg: 'Pitch is not exist' }));
                            res.status(200).end();
                            return 0;
                        }

                        res.write(JSON.stringify({ error_code: 0}));
                        res.status(200).end();

                        app_exist.comment.splice(app_exist.comment.indexOf(cmt_id), 1);
                        app_exist.save(function(err){
                            if (err)
                                console.log(err);
                        })
                    })

                });

            })

        })
    };
};
