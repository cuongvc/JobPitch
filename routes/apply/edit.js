var check_app     = require('./../../my_module/check_exist').application;
var check_token   = require('./../../my_module/check_exist').token;
var Application   = require('./../../models/applications');
var respon_object = require('./../../my_module/respon_object').application;

module.exports = function(req, res) {

    try {
        var data = req.body;

        var token = data.token;
        var user_id = data.user_id;
        var app_id = data.app_id;

        var title = data.title;
        var description = data.description;
        var hash_tag = data.hash_tag;
        var time = new Date(new Date().toGMTString()).toJSON();
        var file = data.file;

    } catch (err) {
        res.write(JSON.stringify({ error_code: 1, msg: err.toString() }));
        res.status(200).end();
        return 0;
    } finally {
        check_token(user_id, token, function(exist, user_exist) {

            if (!exist) {
                res.write(JSON.stringify({ error_code: 1, msg: 'Authenticate is not exist' }));
                res.status(200).end();
                return 0;
            }

            check_app(app_id, function(exist_, app_exist){
                if (!exist){
                    res.write(JSON.stringify({ error_code: 1, msg: 'Application is not exist' }));
                    res.status(200).end();
                    return 0;
                }

                if (app_exist.user_id != user_id){
                    res.write(JSON.stringify({ error_code: 1, msg: 'You have not permisstion to edit this pitch' }));
                    res.status(200).end();
                    return 0;
                }

                app_exist.editInfor(title, description, hash_tag, time, file, function(newApp){
                    res.write(JSON.stringify({ error_code: 0, app : newApp }));
                    res.status(200).end();
                    return 0;
                })

            })

        })
    }

}
