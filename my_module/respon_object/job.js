module.exports					=	function(res, object){
	object.save(function(err){
		if (err){
			console.log(err);
			res.write(JSON.stringify({error_code : 1, job : null}));
			res.status(200).end();
		} else{
			res.write(JSON.stringify({error_code : 0, job : object}));
			res.status(200).end();			
		}
	})

}