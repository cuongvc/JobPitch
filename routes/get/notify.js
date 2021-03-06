var Notify  									= require('./../../models/notifications');
var check_token               = require('./../../my_module/check_exist').token;

module.exports								=	function(req, res){
	
	try{
		var data    = req.body;
		
		var user_id = data.user_id;
		var token   = data.token;
		var skip    = data.skip;
		var limit   = data.limit;
		
	}

	catch(err){
		res.write(JSON.stringify({ error_code : 1, msg : err.toString() }));
		res.status(200).end();
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({ error_code : 1, msg : 'Authenticate is not success' }));
				res.status(200).end();
			} else{
				var q = Notify.find({_id : {$in : user_exist.notifications.list}}).skip(skip).limit(limit).sort({'time' : -1});
				q.exec(function(err, notifys){

					if (err){
						console.log(err);
						res.write(JSON.stringify({ error_code : 1, msg : err.toString() }));
						res.status(200).end();
					} else {
						res.write(JSON.stringify({ error_code : 0, notifys : notifys }));
						res.status(200).end();
						
						for (var  i = 0 ; i < notifys.length ; i ++){
							notifys[i].status = 1;
							notifys[i].save(function(err){})
						}
						user_exist.notifications.unread = 0;
						user_exist.save(function(err){});
					}

				})
			}

		})
	}

}