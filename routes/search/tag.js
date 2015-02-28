// position   : = 1 when search in jobs, 2 when search in applications
var Tag                         = require('./../../models/hashtags');
var Job                         = require('./../../models/jobs');
var Application                 = require('./../../models/applications');


module.exports									=	function(req, res){

	try{
		var data  				=	req.body;

		var tag       		= '#' + data.tag;
		var country_short_name = data.country_short_name;
		var position			=	data.position;
	}	

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{

		Tag.findOne({name : tag}, function(err, tag_exist){
			if (err){
				res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
				res.status(200).end();
				return 0;
			};
			if (!tag_exist){
				res.write(JSON.stringify({error_code : 0, applications : [], jobs : []}));
				res.status(200).end();
				return 0;
			}

			if (typeof(tag_exist.country[country_short_name]) == 'undefined'){
				res.write(JSON.stringify({error_code : 0, applications : [], jobs : []}));
				res.status(200).end();
				return 0;
			}


			if (position == 1){

				Job.find({_id : {$in : tag_exist.country[country_short_name].job_id}}, function(err, jobs){
					console.log(tag_exist.country[country_short_name].job_id);
					if (err){
						console.log(err);
						res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
						res.status(200).end();
						return 1;
					};

					res.write(JSON.stringify({error_code : 0, jobs : jobs}));
					res.status(200).end();
					return 1;
				})
			} else if (position == 2) {

				Application.find({_id : {$in : tag_exist.country[country_short_name].app_id}}, function(err, applications){

					if (err){
						console.log(err);
						res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
						res.status(200).end();
						return 1;
					};

					res.write(JSON.stringify({error_code : 0, applications : applications}));
					res.status(200).end();
					return 1;
					
				})

			} else {
				
				Job.find({_id : {$in : tag_exist.country[country_short_name].job_id}}, function(err, jobs){

					if (err){
						console.log(err);
						res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
						res.status(200).end();
						return 1;
					};

					Application.find({_id : {$in : tag_exist.country[country_short_name].app_id}}, function(err, applications){

						if (err){
							console.log(err);
							res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
							res.status(200).end();
							return 1;
						};

						res.write(JSON.stringify({error_code : 0, applications : applications, jobs : jobs}));
						res.status(200).end();
						return 1;
						
				})

				})
			}

		})	

	}

}