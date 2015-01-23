var check_token       = require('./../../my_module/check_token');

module.exports				=	function(req, res){
	try{
		var data    	= req.body;
		var type_acc	= data.type_acc;
		var user_id 	= data.user_id;
		var token   	= data.token;
	}
	catch(err){
		console.log(err);
		res.json({error_code : 1, msg : err.toString()});
		res.status(200).end();
	}
	finally{
		check_token(type_acc, user_id, token, function(exist, object_exist){
			if (exist){
				res.json({error_code : 0});
				res.status(200).end();
			} else{
				res.json({error_code : 1, msg : 'Authenticate is not successt'});
				res.status(200).end();
			}
		})
	}
}