var async			  				  =		require('async');
var graph 			   				= 	require('fbgraph');

var respon_object         =   require('./../../../my_module/respon_object').talent;
var acc_exist_fb_id 			=		require('./../../../my_module/account_exist').facebook_id;
var client_id       			=   require('./../../../my_module/authen/auth').client_id_fb;
var client_secret   			=   require('./../../../my_module/authen/auth').client_secret_fb;
var reverseGeocode  		  = 	require('./../../../my_module/map/reverseGeocode');
var Talent             		=   require('./../../../models/talents');

var options = {
    timeout:  3000
    , pool:     { maxSockets:  Infinity }
    , headers:  { connection:  "keep-alive" }
};


function  API(api, callback){
  graph
    .setOptions(options)
    .get(api, function(err, data) {
      if (err) {
       	callback(err, null);
      } else{
	      callback(null, data);
      }    
    });
  }

module.exports = function(req, res){	
	var access_token = '';

	var profile = {},
	    friends = {},
	    location = {},
	    avatar = {};


	try{
		access_token = req.body.access_token;
		//location     = req.body.location;

	}
	catch(err){
		res.json({error_code : 201, msg : err.toString()});
		res.status(200).end();
	} 
  finally{
		async.series([
			function(next){
			  graph.setAccessToken(access_token);
			  graph.extendAccessToken({
			      "access_token"	:      access_token
			    , "client_id"			:       client_id
			    , "client_secret"	:   client_secret
			  }, function (err, facebookRes) {
			    if (err) {
			    	res.json({error_code : 1, msg : err.message});			  //	Access_token is incorrect
			   		res.status(200).end();
			    } else {
			      next(null);
			    }
			  });
			},


			function( next){																								// GET PROFILE
			    API("/me/permissions", function(err, data){
			    		console.log(data);
			    		next(null);		
  	
			    });
			},

			function( next){																								// GET PROFILE
			    API("/me", function(err, data){
			    	if (err){
			    		console.log(err);
			       	res.json({error_code : 1, msg : err.message});			//	Have error
			       	res.status(200).end();
			    	} else{
			    		profile = data;
			    		next(null);		
			    	}  	
			    });
			},
			function( next){
			    API("/me/friends", function(err, data){											// GET FRIENDS
			    	if (err){
			    		console.log(err);
			       	res.json({error_code : 1, msg : err.message});			//	Have error
			       	res.status(200).end();
			    	} else{
				    	friends = data.data;
				    	next(null);
				    }
			    });
			},

			function(next){
			    API("me?fields=picture.width(800).height(800)&redirect=false", function(err, data){
			    	if (err){
			    		console.log(err);
			       	res.json({error_code : 1, msg : err.message});			//	Have error
			       	res.status(200).end();
			    	} else{
					    avatar = data.picture.data.url;												  // GET AVATAR
					    next(null);	
					  }
			    });

			}], function(err){
					console.log('User profile : ', profile);
					acc_exist_fb_id(Talent, profile.id, function(exist, talent){
						if (exist){

							talent.fb_infor.access_token = access_token;
							respon_object(res, talent);

						} else{
							var newTalent = new Talent();

							newTalent.newInforFb(avatar, profile, function(new_talent){
								respon_object(res, new_talent);
							});
						}
					});
			}
		)
  }
};