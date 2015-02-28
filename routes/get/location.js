
var check_token = require('./../../my_module/check_exist').token;

module.exports = function(req, res) {

    try {
        var data = req.body;

        var user_id = data.user_id;
        var token = data.token;

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
                res.write(JSON.stringify({ error_code: 1, msg: 'Authenticate is not exist' }));
                res.status(200).end();
                return 0;
            } else{
                res.write(JSON.stringify({error_code : 0, position : user_exist.position}));
                res.status(200).end();
            }

        })
    }

}
