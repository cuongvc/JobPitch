var Application       = require('./../../models/applications');
var check_token       = require('./../../my_module/check_exist').token;

module.exports				=	function(req, res){

	try{
		var data          = req.body;
		
		var user_id       = data.user_id;
		var token         = data.token;
		
		var own_of_app_id = data.own_of_app_id;
		var skip          = data.skip;
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
				console.log(typeof(own_of_app_id) == 'undefined');
				if ( typeof(own_of_app_id) == 'undefined' || own_of_app_id == ''){
				  var q = Application.find({}).skip(skip).limit(limit).sort({'time' : -1});
				}
				else{
					var q = Application.find({user_id : own_of_app_id}).skip(skip).limit(limit).sort({'time' : -1});
				}

				q.exec(function(err, applications){
					res.write(JSON.stringify({error_code : 0, applications : applications}));
					res.status(200).end();

				})
			}
		})
	}

}