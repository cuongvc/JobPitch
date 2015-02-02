var HashTag             = require('./../../models/tags');

module.exports					=	function(hash_tag, app_id){

	add_tag                 = function(hash_tag, i, app_id){
		console.log(' i  : ', i, 'hash_tag : ', hash_tag);
		if (i == hash_tag.length)
			return 0;
		console.log(hash_tag[i]);
		HashTag.findOne({name : hash_tag[i]}, function(err, hash_tag_exist){

			console.log(hash_tag_exist);
			if (err){
				console.log(err);
				return 1;
			};

			if (hash_tag_exist){
				
				hash_tag_exist.app_id.push(app_id);
				hash_tag_exist.save(function(err){
					add_tag(hash_tag,  i + 1, app_id);	
				})
				
			} else{
				var newHashTag = new HashTag();
				newHashTag.name = hash_tag[i];
				newHashTag.app_id.push(app_id);
				newHashTag.save(function(err){
					add_tag(hash_tag,  i + 1, app_id);
				})
			}
		})

	}

	if (hash_tag.length > 0){
		console.log('add tag');
		add_tag(hash_tag, 0, app_id);
	}
}