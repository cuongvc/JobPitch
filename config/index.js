var flash        = require('connect-flash');
var path         =   require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var express      = require('express');
var helmet       = require('helmet');


var favicon = require('serve-favicon');

// module.exports = function(app, id, Router_raw, Router_formdata, Router_body){
module.exports = function(app, Router_formdata, Router_body, passport){
    app.use(helmet());
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    //app.use(bodyParser()); // get information from html forms
    
    app.use(bodyParser());            //  get information from html form

    app.use(bodyParser.json());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb'}));
    
    require('./passport')(passport); // pass passport for configuration

    // required for passport
    app.use(session({ secret: 'wearecampcoders.com123456' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('html', require('ejs').renderFile);

    // setup director
    app.set('views', __dirname + './../views');
    app.use(express.static(__dirname + './../public'));
    // app.use(favicon(__dirname + '/public/favicon.ico'));

    Router_body.use(function(req, res, next){
    	console.log('\n' + new Date);
      console.log('Data request : ', req.body);
      // console.log('Core process : ', id);
    	next();
    })

    app.use('/api', Router_formdata);
    app.use('/api', Router_body);

    // app.use('/api', Router_raw);


}

