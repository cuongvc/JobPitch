// var dev_port 					 = 3000;
// var dev_domain 			   = 'localhost';

var dev_port 					 = 6969;
var dev_domain 			   = 'campcoders.com';


exports.port           =  dev_port;

exports.avatar_default = 'http://' + dev_domain + ':' + dev_port + '/img/full_size/avatar/default-avatar.png';
exports.logo_default   = 'http://' + dev_domain + ':' + dev_port + '/img/full_size/logo/default-logo.png';

exports.domain_default = 'http://' + dev_domain + ':' + dev_port;

exports.database       = 'mongodb://' + dev_domain + '/jobpitch';

