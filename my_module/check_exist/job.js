var Job       = require('./../../models/jobs');

module.exports  = function(job_id, callback){
	Job.findOne({_id : job_id }, function(err, job_exist){
		if (err || !job_exist){
			console.log(err);
			callback(0, null);
			return 0;
		}
		callback(1, job_exist);
	})
}