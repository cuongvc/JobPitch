var async               = require('async');
var Job                 = require('./../../models/jobs');
var check_token         = require('./../../my_module/check_exist').token;
var distance            = require('./../../my_module/map/distance');

module.exports					=	function(req, res){

	try{
		var data 						= req.body;

		var token 					= data.token;
		var user_id         = data.user_id;
		var lat             = data.lat;
		var lng             = data.lng;
		var address         = data.address;
		var tag             = data.tag;
	}

	catch(err){
		res.write(JSON.stringify({ error_code : 1, msg : err.toString() }));
		res.status(200).end();
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is incorrect'}));
				res.status(200).end();
				return 0;
			};

			user_exist.location.lat = lat;
			user_exist.location.lng = lng;
			user_exist.location.address = address;
			user_exist.save(function(err){ });

			var result = [];
			Job.find({}, function(err, jobs){

				async.waterfall([
					function(next){

						for (var i = 0 ; i < jobs.length; i ++){
							if (jobs[i].containTag(tag) && jobs[i].distance(lat, lng) ){
								result.push(jobs[i]);
							}
						};						
						next(null);
					},

					function(next){
						result.sort(function(x, y){
							return x.time < y.time;
						});
						next(null);
					}

				], function(err){
					res.write(JSON.stringify({ error_code : 0, jobs : result}));
					res.status(200).end();
				});
			})
		})
	}	
}