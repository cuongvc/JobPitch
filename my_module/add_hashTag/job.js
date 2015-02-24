var HashTag             = require('./../../models/tags');
var async               = require('async');

module.exports					=	function(hash_tag, job_id, callback){

	add_tag                 = function(hash_tag, i, job_id){
		if (i == hash_tag.length)
			return 0;
		HashTag.findOne({name : hash_tag[i]}, function(err, hash_tag_exist){

			if (err){
				console.log(err);
				return 1;
			};

			if (hash_tag_exist){

				hash_tag_exist.job_id.push(job_id);
				hash_tag_exist.save(function(err){
					add_tag(hash_tag,  i + 1, job_id);	
				})
				
			} else{
				var newHashTag = new HashTag();
				newHashTag.name = hash_tag[i];
				newHashTag.job_id.push(job_id);
				newHashTag.save(function(err){
					add_tag(hash_tag,  i + 1, job_id);
				})
			}
		})

	}

	if (hash_tag.length > 0){

		async.waterfall([
			function(next){
				add_tag(hash_tag, 0, job_id);
				next(null);
			}], function(err){
				callback();
		});
	} else{
		callback();
	}
}