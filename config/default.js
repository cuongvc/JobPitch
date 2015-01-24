// var dev_port 					 = 3000;
// var dev_domain 			   = 'localhost';

var dev_port 					 = 6969;
var dev_domain 			   = 'jobpitch.campcoders.com';


exports.port           =  dev_port;

exports.avatar_default 			= 'http://' + dev_domain + ':' + dev_port + '/images/full_size/TalentImages/default-avatar.png';
exports.logo_default   			= 'http://' + dev_domain + ':' + dev_port + '/images/full_size/CompanyLogos/default-logo.png';
exports.jobImage_default   	= 'http://' + dev_domain + ':' + dev_port + '/images/full_size/JobImages/default-image.png';


exports.domain_default = 'http://' + dev_domain + ':' + dev_port;

exports.database       = 'mongodb://' + dev_domain + '/jobpitch';


