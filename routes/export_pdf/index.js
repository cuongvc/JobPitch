var bcrypt = require('bcrypt-nodejs');
var domain = require('./../../config/default').domain_default;

module.exports				=	function(req, res){

	try{

		var data      = req.body;

		var link_html = data.link_html;

	}

	catch(err){
    res.write(JSON.stringify({error_code : 1, msg : err.toString()}));             //  Input is invalid
    res.status(200).end();
	}

	finally{
		var NodePDF = require('nodepdf');
		var save_state = '/pdf/' + bcrypt.hashSync((new Date()).toString(), bcrypt.genSaltSync(8), null) + '.pdf';
		var pdf = new NodePDF(link_html, './public' + save_state, {
		    'viewportSize': {
		        'width': 1440,
		        'height': 900
		    }, 
		    'args': '--debug=true'
		});
		 
		pdf.on('error', function(msg){
		    console.log('Error : ', msg);
		});
		 
		pdf.on('done', function(pathToFile){
		    console.log('done : ', pathToFile);
		    var link_pdf = domain + save_state;
		    console.log('link : ', link_pdf);
		    res.write(JSON.stringify({error_code : 0, link_pdf : link_pdf}));
		    res.status(200).end();
		});
		 
		// listen for stdout from phantomjs 
		pdf.on('stdout', function(stdout){
		     // handle 
		     console.log('stdout : ', stdout);
		});
		 
		// listen for stderr from phantomjs 
		pdf.on('stderr', function(stderr){
		    // handle 
		    console.log('stderr : ', stderr);
		});	
	}

}