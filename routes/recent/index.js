var async       = require('async');
var Job         = require('./../../models/jobs');
var check_token = require('./../../my_module/check_exist').token;
var distance    = require('./../../my_module/map/distance');
var geoip       = require('geoip-lite');


module.exports					=	function(req, res){

	try{
		var data 						= req.body;

		var token 					= data.token;
		var user_id         = data.user_id;
		var tag             = data.tag;
		var skip            = data.skip;
		var limit           = data.limit;
	}

	catch(err){
		res.write(JSON.stringify({ error_code : 1, msg : err.toString() }));
		res.status(200).end();
		return 0;
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is incorrect'}));
				res.status(200).end();
				return 0;
			};

			var position = user_exist.position;

			if (user_exist.position.lat == 21.029346){
				var ip = req.headers['x-forwarded-for'] || 
						     req.connection.remoteAddress || 
						     req.socket.remoteAddress ||
						     req.connection.socket.remoteAddress;


				var geo = geoip.lookup(ip);
				if (geo){
					position.lat = geo.ll[0];
					position.lng = geo.ll[1];

					position.city.short_name = geo.city;
					position.city.long_name = geo.city;
					position.country.short_name = geo.country;
					position.country.long_name = geo.country;
					position.state.short_name = geo.region;
					position.state.long_name = geo.region;

					user_exist.position = position;
					user_exist.save(function(err){ 
						if (err){
							console.log(err);
						}
					});
				}


			} 	

			var result = [];
			var q = Job.find({}); 

			q.exec(function(err, jobs){

				async.waterfall([
					function(next){
						// console.log('PASS FIND : ', jobs);		

						for (var i = 0 ; i < jobs.length; i ++){
							if (jobs[i].containTag(tag) && jobs[i].distance(user_exist.position.lat, user_exist.position.lng) ){
								result.push(jobs[i]);
							}
						};				
						// console.log('PASS DISTANCE : ', result);		
						next(null);
					},

				], function(err){

					res.write(JSON.stringify({ error_code : 0, jobs : result.slice(skip, limit)}));
					res.status(200).end();
				});
			})
		})
	}	
}