var fs     = require('fs');
var url    = require('url');
var domain = require('./../../config/default').domain_default;
var im     = require('imagemagick');
var path   = require('path');

	
	// path_url : /images/small_size/
  // url_full_size : http://localhost:3000/.....
  // type : JobImages | CompanyLogos | TalentImages

module.exports 					=	function(path_url, url_full_size, type,  callback){

	if (process.argv[2] == 'dev'){
			var gm = require('gm');																			// gm with location
	} else{
			var gm = require('gm').subClass({ imageMagick: true });	    // gm with server
	}
	
	console.log('./public' + url.parse(url_full_size).path);

	gm('./public' + url.parse(url_full_size).path)
		.resize(200, 200)
		.autoOrient()
		.write('./public' + path_url + type + '/' + path.basename(url_full_size), function (err) {
			if (err) {
				console.log('Error : ', err);
			}
			else{
				console.log('RESIZE SMALL SUCCESS');
				callback(domain + path_url + type + '/' + path.basename(url_full_size));
			}
		})
}