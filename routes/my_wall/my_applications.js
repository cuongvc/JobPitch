var Application                  			= require('./../../models/applications');
var check_token								=	require('./../../my_module/check_exist').token;


module.exports								=	function(req, res){

	try{
		var data 						=	req.body;

		var user_id					=	data.user_id;
		var token 					=	data.token;
	}

	catch(err){
		res.write(JSON.stringify({ error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not exist'}));
				res.status(200).end();
				return 0;
			};

			Application.find({_id : {$in : user_exist.myApplications}}, function(err, applications){
				if (err){
					console.log(err);
					res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
					res.status(200).end();
				};

				res.write(JSON.stringify({error_code : 0, applications : applications}));
				res.status(200).end();
				
			})

		})
	}

}