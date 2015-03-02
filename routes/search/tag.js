// position   : = 1 when search in jobs, 2 when search in applications
var Tag                         = require('./../../models/hashtags');
var Job                         = require('./../../models/jobs');
var Application                 = require('./../../models/applications');

var async                       = require('async');

module.exports									=	function(req, res){

	try{
		var data               =	req.body;
		
		var tag                = '#' + data.tag;
		var country_short_name = data.country_short_name;
	}	

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{

		var job_array = [];
		var application_array = [];

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

			Job.find({_id : {$in : tag_exist.country[country_short_name].job_id}}, function(err, jobs){

				if (err){
					console.log(err);
					res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
					res.status(200).end();
					return 1;
				};

				job_array = jobs;
				var index = 0;
				async.waterfall([
					function(next){
						jobs.forEach(function(job){
							index ++;

							Application.find({_id : {$in : job.applications.list}}, function(err, applications){
								if (err){
									console.log(err);
									res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
									res.status(200).end();
									return 1;
								};
								console.log('xxx');
								application_array = application_array.concat(applications);
								if (index == jobs.length){
									next(null);
								}
							})
						});		
						
					}], function(err){
						res.write(JSON.stringify({error_code : 0, applications : application_array, jobs : job_array}));
						res.status(200).end();
						return 1;
					})
			});
		})
	}
}