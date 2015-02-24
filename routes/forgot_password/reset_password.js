var Users = require('./../../models/users');
var Reset_keys = require('./../../models/reset_keys');
var bcrypt             = require('bcrypt-nodejs');

var email;

module.exports    = function(req, res){
	try {
	    var data = req.body;
	    var key = data['Reset key'];
	    var new_password = data['New password'];
	    var confirm_password = data['Confirm password'];
	    if (new_password != confirm_password) {
	        throw new Error('Passwords is not compare');
	    }
	}

	catch(err){
			res.write(JSON.parse({message : 'Have error : '+ err.toString()}));
			res.status(200).end();
			return 0;
	}

	finally{
		Reset_keys.findOne({key : key}, function(err, reset_key){
			if (err){
				res.write(JSON.stringify({message : 'ERROR :' + err.toString()}));
				res.status(200).end();
			} else if (!reset_key){
				res.write(JSON.stringify({message : 'ERROR'}));
				res.status(200).end();
			} else{
				email = reset_key.email;

				Users.findOne({email : email}, function(err, user_exist){
					if (err){
						res.render('reset_password_fail.ejs'); 
						res.status(200).end();
					} else if(!user_exist){
						res.render('reset_password_fail.ejs');
						res.status(200).end();
					} else{
						user_exist.local_infor.password =  bcrypt.hashSync(new_password, bcrypt.genSaltSync(8), null);
						user_exist.save(function(err){
							res.render('reset_password_success.ejs');
							res.status(200).end();
						});
					}
				})

				Reset_keys.remove({key : key }, function(err, number){
					if (err){
						console.log(err);
					};
				})	
			}
		})
	}
}