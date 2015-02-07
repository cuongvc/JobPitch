var clients = [];
var io  = [];
var users = [];
var content = 'Nguời theo cánh chim về vui với đời Để lại thương nhớ cho kiếp đơn côi ';
var client_number = 1;

var send_number = 0;
var recei_number = 0;

var recei = {};

// ========================= Make connect ===================================================

function make_connect(id, callback){
	io[id] = require('socket.io-client');

	if (users[id] == 1){
		console.log('REMAKE NEW CONNECT', id);
	} else
		users[id] = 1;

	// client = io[id].connect('http://localhost:6789/chat?user_id=' + id, {'force new connection': true});
	client = io[id].connect('http://job.dev:6970/chat?user_id=' + id, {'force new connection': true});
	clients.push(client);
	callback();
};

for (i = 0 ; i < client_number ; i ++){
	make_connect(i, function(){
	})	
}

// ========================= Send message ===================================================


function send_message(id, callback){
	clients[i].emit('Send message', {user_send : i, user_recei : i + 1, content : content});
	callback();
}

setTimeout(function(){
	// console.log('Chay lan 1');
	for (i = 0 ; i < client_number ; i = i + 2){
		send_message(i, function(){
			send_number ++;	
		})	
	}
}, 10000);

// ========================= Recei message ===================================================

function recei_message(id, callback){
	clients[id].on('Send message', function(data){
		recei_number ++;

	 	var user_send  = data.user_send;
	 	var user_recei = data.user_recei;
	 	var content    = data.content;
	 	var status     = 0;
	 	var time       = (new Date).toJSON();
	 	// console.log(user_send + ' send to ' + user_recei + ' with message : ' + content);

	});
	callback();
}

for (i = 0 ; i < client_number ; i ++){
	recei_message(i, function(){
	})
}

var start = new Date;

setInterval(function(){
	console.log(new Date - start);
	console.log('Message send : ', send_number);
	console.log('Message recei : ', recei_number);
}, 10000)

// io = require('socket.io-client'); 
// socket1 = io.connect('http://xxxx:3000',{'force new connection': true}); 
// socket2 = io.connect('http://xxxx:3000',{'force new connection': true}); 

// socket1.my_nick = "Socket One" 
// socket2.my_nick = "Socket Two" 

// console.info(socket1.my_nick); 
// console.info(socket2.my_nick); 