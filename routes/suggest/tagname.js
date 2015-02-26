var User = require('./../../models/users');

module.exports				=	function(req, res){
	User.find({}, 'tagname', function(err, users){

		if (err){
			res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
			res.status(200).end();
			return 0;
		}

		res.write(JSON.stringify({error_code : 0, tagname : users}));
		res.status(200).end();

	})
}