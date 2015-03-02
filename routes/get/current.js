var async       = require('async');
var geoip       = require('geoip-lite');


var Application = require('./../../models/applications');
var check_token = require('./../../my_module/check_exist').token;

module.exports				=	function(req, res){

	try{
		var data          = req.body;
		
		var user_id       = data.user_id;
		var token         = data.token;
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

				var ip = req.headers['x-forwarded-for'] || 
						     req.connection.remoteAddress || 
						     req.socket.remoteAddress ||
						     req.connection.socket.remoteAddress;

				var current = user_exist.current;
						     
				var geo = geoip.lookup(ip);
				if (geo){
					current.lat = geo.ll[0];
					current.lng = geo.ll[1];

					current.city.short_name = geo.city;
					current.city.long_name = geo.city;
					current.country.short_name = geo.country;
					current.country.long_name = geo.country;
					current.state.short_name = geo.region;
					current.state.long_name = geo.region;

					user_exist.current = current;
					user_exist.position = current;

					user_exist.save(function(err){ 
						if (err){
							console.log(err);
						}
						res.write(JSON.stringify({error_code : 0, new_current : user_exist.current}));
						res.status(200).end();
						return 0;
					});
				} else{
					res.write(JSON.stringify({error_code : 1, msg : 'Cannot get current'}));
					res.status(200).end();
					return 0;
				}


			}
		})
	}

}