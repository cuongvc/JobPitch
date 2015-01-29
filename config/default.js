var dev_port             = 6969;
<<<<<<< HEAD
var dev_domain           = 'job.dev';

// var dev_port          =  6969;
// var dev_domain        =  'jobpitch.campcoders.com';
=======
var dev_domain           = 'localhost';

var dev_port             =  6969;
var dev_domain           =  'job.dev';
>>>>>>> 41ee0950807a3c2053b21df3c4373d8f146eb907

exports.port             =  dev_port;

<<<<<<< HEAD
exports.avatar_default   = 'http://' + dev_domain + ':' + dev_port + '/images/full_size/TalentImages/default-avatar.png';
exports.logo_default     = 'http://' + dev_domain + ':' + dev_port + '/images/full_size/CompanyLogos/default-logo.png';
exports.jobImage_default = 'http://' + dev_domain + ':' + dev_port + '/images/full_size/JobImages/default-image.png';
exports.distanceLimit    = 100;

exports.domain_default   = 'http://' + dev_domain + ':' + dev_port;

=======
exports.port             =  dev_port;

exports.avatar_default   = 'http://' + dev_domain + ':' + dev_port + '/images/full_size/TalentImages/default-avatar.png';
exports.logo_default     = 'http://' + dev_domain + ':' + dev_port + '/images/full_size/CompanyLogos/default-logo.png';
exports.jobImage_default = 'http://' + dev_domain + ':' + dev_port + '/images/full_size/JobImages/default-image.png';
exports.distanceLimit    = 100;

exports.domain_default   = 'http://' + dev_domain + ':' + dev_port;

>>>>>>> 41ee0950807a3c2053b21df3c4373d8f146eb907
exports.database         = 'mongodb://' + dev_domain + '/jobpitch';


