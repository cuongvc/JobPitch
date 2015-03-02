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

		var avatar                = data.avatar;
		var extension             = data.extension;
		var address               = data.address;
		var tagname               = data.tagname;
		var summary               = data.summary;
		var specialties           = data.specialties;
		var email           			= data.email;
		var skype                 = data.skype;
		var phone                 = data.phone;
		var moreInfor             = data.moreInfor;


		var contact               = data.contact;
		var website               = data.website;


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

			User.findOne({tagname : tagname}, function(err, tagname_exist){

				if (err || tagname_exist){
					res.write(JSON.stringify({error_code : 1, msg : 'TagName is already exist'}));
					res.status(200).end();
					return 1;
				}

				if (avatar != ''){
					move_file(avatar, extension, 'UserImages', function(err_exist, error, avatar, avatar_small, avatar_normal){
						if (!err_exist){
							user_exist.editProfile(avatar, avatar_small, avatar_normal, address, tagname,
							    email, skype, phone, moreInfor, summary, specialties, contact, website,
							    industry, education, year_of_birth,
							    function(user) {
							        respon_object(0, res, user);
							        return 1;
							    })
						}
					})
				} else{
					user_exist.editProfile('', '', '', address, tagname,
					    email, skype, phone, moreInfor, summary, specialties, contact, website,
					    industry, education, year_of_birth,
					    function(user) {
					        respon_object(0, res, user);
					        return 1;
					    })
				}
			})			
		})
	}

}