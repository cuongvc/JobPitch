module.exports					=	function(makeToken, res, object){
	console.log('Respon_Object');
	if (makeToken){
	 	object.makeToken();
	}
	
	object.save(function(err){
		if (err){
			console.log(err);
			res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
			res.status(200).end();
		} else{
			res.write(JSON.stringify({error_code : 0, user : object}));
			res.status(200).end();
		}
	})
}