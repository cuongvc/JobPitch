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

			var lat = user_exist.location.lat;
			var lng = user_exist.location.lng;

			if (typeof(user_exist.location.lat) == 'undefined'){
				console.log(req.ip);
				var geo = geoip.lookup(req.ip);
				console.log(geo);
				lat = geo.ll[0];
				lng = geo.ll[1];
				var city = geo.city;
				var country = geo.country;

				user_exist.location.lat = lat;
				user_exist.location.lng = lng;
				user_exist.location.country = country;
				user_exist.location.city = city;

				user_exist.save(function(err){ });

			} 	

			var result = [];
			var q = Job.find({}).skip(skip).limit(limit).sort({'time' : -1}); 

			q.exec(function(err, jobs){

				async.waterfall([
					function(next){

						for (var i = 0 ; i < jobs.length; i ++){
							if (jobs[i].containTag(tag) && jobs[i].distance(lat, lng) ){
								result.push(jobs[i]);
							}
						};						
						next(null);
					},

				], function(err){
					res.write(JSON.stringify({ error_code : 0, jobs : result}));
					res.status(200).end();
				});
			})
		})
	}	
}