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
		 
		var pdf = new NodePDF(link_html, 'google.pdf', {
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
		});
		 
		// listen for stdout from phantomjs 
		pdf.on('stdout', function(stdout){
		     // handle 
		});
		 
		// listen for stderr from phantomjs 
		pdf.on('stderr', function(stderr){
		    // handle 
		});	
}

}