module.exports					=	function(res, object){

	res.write(JSON.stringify({error_code : 0, job : object}));
	res.status(200).end();			


}