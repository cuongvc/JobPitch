var check_token                   = require('./../../my_module/check_exist').token;
var check_comment                 = require('./../../my_module/check_exist').comment;
var Comment                       = require('./../../models/comments');
var Application                   = require('./../../models/applications');

module.exports										=	function(req, res){

	try{
		var data = req.body;
		
		var user_id            = data.user_id;
		var token              = data.token;
		var cmt_id             = data.comment_id;

		var content            = data.content;
		var hash_tag           = data.hash_tag;
    var time 							 = new Date(new Date().toGMTString()).toJSON();
	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success' }));
				res.status(200).end();
				return 0;
			};

			check_comment(cmt_id, function(exist_cmt, cmt_exist){
				if (!exist_cmt){
					res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success' }));
					res.status(200).end();
					return 0;
				}

				if (cmt_exist.user_id != user_id){
          res.write(JSON.stringify({ error_code: 1, msg: 'You have not permisstion to edit this comment' }));
          res.status(200).end();
          return 0;
				}

				cmt_exist.editInfor(content, hash_tag, time, function(newComment){
          res.write(JSON.stringify({ error_code: 0, comment : newComment }));
          res.status(200).end();
				})

			})

		})
	}
}