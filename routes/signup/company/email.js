var acc_exist_companyName = require('./../../../my_module/account_exist').company_name;
var acc_exist_email       = require('./../../../my_module/account_exist').email;
var respon_object         = require('./../../../my_module/respon_object').company;
var Company               = require('./../../../models/companys');

module.exports				=	function(req, res){
	try{
		var data 			  =	req.body;
		var companyName = data.companyName;
		var email       = data.email;
		var password    = data.password;
	}
	catch(err){
		console.log(err);
		res.json({error_code : 1, msg : err.toString()});
		res.status(200).end();
	}
	finally{
		acc_exist_email(Company, email, function(exist, company_exist){

			if (exist){
				res.json({error_code : 1, msg : 'Email is exist'});
				res.status(200).end();

			} else{
				acc_exist_companyName(companyName, function(exist_, company_exist){
					if (exist_){
						res.json({error_code : 1, msg : 'CompanyName is exist'});
						res.status(200).end();						

					} else{
						var newCompany  = new Company();
						newCompany.newInforLC(companyName, email, password, function(new_Company){
							respon_object(res, new_Company);
						})
					}
				})
			}
		})
	}
}