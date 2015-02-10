var Application       = require('./../../models/applications');
var check_token       = require('./../../my_module/check_exist').token;

module.exports				=	function(req, res){

	try{
		var data 					= req.body;

		var user_id       = data.user_id;
		var token         = data.token;
		var start         = data.start;
		var limit         = data.limit;
	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
		return 0;
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success'}));
				res.status(200).end();
			} else {

				var q = Application.find({}).limit(limit).sort({'time' : -1});
				q.exec(function(err, applications){
					applications = applications.slice(start, limit);
					res.write(JSON.stringify({error_code : 0, applications : applications}));
					res.status(200).end();

				})
			}
		})
	}

}