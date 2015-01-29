// var dev_port          =  6969;
// var dev_domain        =  'jobpitch.campcoders.com';

var dev_port             =  6969;
var dev_domain           =  'job.dev';

exports.port             =  dev_port;

exports.avatar_default   = 'http://' + dev_domain + ':' + dev_port + '/images/full_size/TalentImages/default-avatar.png';
exports.logo_default     = 'http://' + dev_domain + ':' + dev_port + '/images/full_size/CompanyLogos/default-logo.png';
exports.jobImage_default = 'http://' + dev_domain + ':' + dev_port + '/images/full_size/JobImages/default-image.png';
exports.distanceLimit    = 100;

exports.domain_default   = 'http://' + dev_domain + ':' + dev_port;
exports.database         = 'mongodb://' + dev_domain + '/jobpitch';


