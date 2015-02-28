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
				var index = hash_tag_exist.country.indexOf(country_short_name);
				if (index != -1){
					hash_tag_exist.country[index].app_id.push(app_id);
					hash_tag_exist.country[index].number ++;
					hash_tag_exist.save(function(err){
						add_tag(hash_tag,  i + 1, app_id);	
					})
				} else{
					hash_tag_exist.country.push({country_short_name : country_short_name, app_id : [app_id]});
					hash_tag_exist.save(function(err){
						add_tag(hash_tag,  i + 1, app_id);	
					})
				}
					
			} else{
				var newHashTag = new HashTag();
				newHashTag.name = hash_tag[i];
				newHashTag.country.push({country_short_name : country_short_name, app_id : [app_id]});

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