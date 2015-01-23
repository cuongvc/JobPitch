var Company             = require('./../../../models/companys');

var acc_exist_email   	=	require('./../../../my_module/account_exist').email;
var respon_object       = require('./../../../my_module/respon_object/company');

module.exports					=	function(req, res){
	try{
		var	data						=	req.body;
		var email						= data.email;
		var password        = data.password;
	}
	catch(error){
		console.log(error);
		res.json({error_code : 1, msg : error.toString()});
		res.status(200).end();
	}

	finally{
		acc_exist_email(Company, email, function(exist, company_exist){

			if (!exist){
				res.json({error_code : 1, msg : 'Account is not exist'});
				res.status(200).end();

			} else{

				if (company_exist.validPassword(password)){
					respon_object(res, company_exist);

				} else{
					res.json({error_code : 1, msg : 'Password is incorrect'});
					res.status(200).end();					
				}
			}
		})
	}
}