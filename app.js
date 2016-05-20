/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), customers = require('./routes/customerlist'), http = require('http'), path = require('path');

var mongo = require('mongodb');


var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get( '/customers', customers.list );

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.send(500, "An error has occurred. Please try again later.");
});

//catch all
function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('app_error', {
		error : err
	});
}
