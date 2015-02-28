var HashTag             = require('./../../models/hashtags');
var async               = require('async');

module.exports					=	function(country_short_name, hash_tag, app_id, callback){

	add_tag                 = function(hash_tag, i, app_id){
		if (i == hash_tag.length)
			return 0;
		HashTag.findOne({name : hash_tag[i]}, function(err, hash_tag_exist){

			if (err){
				console.log(err);
				return 1;
			};

			if (hash_tag_exist){
				console.log('hash_tag_exist', hash_tag_exist);
				console.log(country_short_name);
				if (hash_tag_exist.country[country_short_name]){
					hash_tag_exist.country[country_short_name].app_id.push(app_id);
					hash_tag_exist.country[country_short_name].number ++;
					hash_tag_exist.markModified('country');

					hash_tag_exist.save(function(err){
						if (err){
							console.log(err);
						}
						console.log('Save success', hash_tag_exist);
						add_tag(hash_tag,  i + 1, app_id);	
					})
				} else{
					hash_tag_exist.country[country_short_name] = {app_id : [app_id], number : 1};
					hash_tag_exist.markModified('country');

					hash_tag_exist.save(function(err){
						if (err){
							console.log(err);
						}
						console.log('Save success', hash_tag_exist);
						add_tag(hash_tag,  i + 1, app_id);	
					})
				}
					
			} else{
				var newHashTag = new HashTag();
				newHashTag.name = hash_tag[i];
				newHashTag.country = {};
				newHashTag.country[country_short_name]  = {app_id : [app_id], number : 1};
				
				newHashTag.save(function(err){
					if (err){
						console.log(err);
					}
					add_tag(hash_tag,  i + 1, app_id);
				})
			}
		})

	}

	if (hash_tag.length > 0){

		async.waterfall([
			function(next){
				add_tag(hash_tag, 0, app_id);
				next(null);
			}], function(err){
				callback();
		});
	} else{
		callback();
	}
}