var io                    = require('socket.io').listen(6970);
var check_token           = require('./../check_exist').token;

var io_notify = io.of('notify');

var list_user = [];
  // array socket of online user
var user_sockets = {};


io_notify.use(function(socket, next){

	console.log('\n HAVE A REQUEST \n');
  user_id = socket.request._query.user_id;
  token   = socket.request._query.token;
  console.log('\n HAVE A REQUEST \n');

  next();
  // check_token(user_id, token, function(exist, user_exist){
  //   if (exist){

  //     user_sockets[user_id] = socket;
  //     list_user.push(user_id);  
  //     socket.user_id = user_id;
  //     next();
  //   } else{
  //     next(new Error('Access denied !!!!'));
  //   }
  // })
});


io_notify.on('connection', function(socket){
  console.log('connection');

	socket.on('disconnect', function(){
      console.log(socket.user_id + ' disconnect');
      socket.broadcast.emit('One user off', socket.user_id);
 	    delete user_sockets[socket.user_id];
      list_user.splice(list_user.indexOf(socket.user_id));
 	})
});

module.exports = io_notify;
