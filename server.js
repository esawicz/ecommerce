var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var massive = require('massive');
var port = 8005;
var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:8555'
};

var secret = require('./config.js');
var connectionString = 'postgres://ellensawicz@localhost/ellensawicz';

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(session({ 
	secret: secret.secret,
	resave: true,
	saveUninitialized: true
}));

var massiveInstance = massive.connectSync({connectionString : connectionString});
app.set('db', massiveInstance);
var db = app.get('db');
console.log('this is db', db)






app.listen(port, function(){
	console.log('Listening on ' + port)
});