if (process.argv[2] == 'dev'){
	var dev_domain           =  'job.dev';	
} else{
	var dev_domain        	 =  'jobpitch.campcoders.com';
} 

var dev_port             	=  6969;


exports.port             =  dev_port;

exports.avatar_default   = 'http://' + dev_domain + '/images/full_size/UserImages/default-avatar.png';
exports.logo_default     = 'http://' + dev_domain + '/images/full_size/UserImages/default-logo.png';
exports.jobImage_default = 'http://' + dev_domain +'/images/full_size/JobImages/default-image.jpeg';
exports.cover_default    = 'http://' + dev_domain +'/images/full_size/UserImages/default-cover.jpeg';
exports.distanceLimit    = 100;

exports.domain_default   = 'http://' + dev_domain;
exports.database         = 'mongodb://' + dev_domain + '/jobpitch';

