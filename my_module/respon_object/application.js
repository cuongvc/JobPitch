module.exports					=	function(res, object){
	object.save(function(err){
		if (err){
			console.log(err);
			res.json({error_code : 1, msg : err.toString()});
			res.status(200).end();
		} else{
			res.json({error_code : 0, application : object});
			res.status(200).end();
		}
	})
}