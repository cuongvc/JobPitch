var HashTag = require('./../../models/tags');

module.exports				=	function(req, res){
	HashTag.find({}, 'name number', function(err, tags){

		if (err){
			res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
			res.status(200).end();
			return 0;
		}

		res.write(JSON.stringify({error_code : 0, hashtag : tags}));
		res.status(200).end();

	})
}