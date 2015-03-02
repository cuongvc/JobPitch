var Tags                = require('./../../models/hashtags');

module.exports					=	function(req, res){
	Tags.find({}, function(err, tags){

		if (err){
			console.log(err);
			res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
			res.status(200).end();
			return 1;
		};

		res.write(JSON.stringify({error_code : 0, tags : tags}));
		res.status(200).end();
	})
}