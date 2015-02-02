var User 											=	require('./../../models/users');
var check_token               = require('./../../my_module/check_exist').token;
var fs                        = require('fs-extra');
var move_file                 = require('./../../my_module/file/move');
var respon_object             = require('./../../my_module/respon_object/user');


module.exports 								=	function(req, res){

	try{
		var data 									=	req.body;

		var user_id               = data.user_id;
		var token                 = data.token;
		var type_account          = data.type_account;
		var address               = data.address;
		var contact               = data.contact;

		var website               = data.website;
		var logo                  = data.logo;
		var companyName						= data.companyName;
		var skype                 = data.skype;
		var phone                 = data.phone;
		var companyEmail          = data.companyEmail;

		var extension             = data.extension;

		var avatar                = data.avatar;
		var userFullname          = data.userFullname;
		var industry              = data.industry;
		var education             = data.education;
		var year_of_birth         = data.year_of_birth;
	}

	catch(err){
		res.write(JSON.stringify({error : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){
			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success'}));
				res.status(200).end();
				return 1;
			};

			if (avatar != ''){
				move_file(avatar, extension, 'TalentImages', function(err_exist, error, avatar, avatar_small, avatar_normal){
					if (!err_exist){
						user_exist.editProfile(address, contact, website, avatar, avatar_small, avatar_normal, '', '', '',
							                     companyName, skype, phone, companyEmail, userFullname, industry, education, 
							                     year_of_birth, function(user){
							respon_object(0, res, user);
							return 1;
						})
					}
				})
			} else

			if (logo != ''){
				console.log('Company');
				move_file(logo, extension, 'CompanyLogos', function(err_exist, error, logo, logo_small, logo_normal){
					if (!err_exist){
						user_exist.editProfile(address, contact, website, '', '', '', logo, logo_small, logo_normal,
							                     companyName, skype, phone, companyEmail, userFullname, industry, education, 
							                     year_of_birth, function(user){
							respon_object(0, res, user);
							return 1;
						})
					} else{
						res.write(JSON.stringify({error_code : 1, msg : error.toString()}));
						res.status(200).end();
					}
				})
			} else

			user_exist.editProfile(address, contact, website, '', '', '', '', '', '',
							               companyName, skype, phone, companyEmail, userFullname, industry, education, 
							               year_of_birth, function(user){
					respon_object(0, res, user);
					return 1;
			})

		})
	}

}