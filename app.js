// Placeholder file for Node.js game server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var util = require('util');
var path = require('path');
var session = require('client-sessions');
var bodyParser = require('body-parser');
//var multer = require('multer');// For multipart/form-data
var cookieParser = require('cookie-parser');

var io = require('socket.io')();
app.io = io;

var loginRouter = require('./routes/loginRouter');
var lobbyRouter = require('./routes/lobbyRouter');
io.attach(server);
app.use(express.static(__dirname + '/public'));
app.use( bodyParser.urlencoded( {
    extended: true
} ) );

app.use( bodyParser.json() );
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  cookieName: 'werewolf_session',
  secret: 'werewolf-wasin',
  duration: 30 * 60 * 1000,//millisec
  activeDuration: 5 * 60 * 1000
}));

app.use('/',loginRouter);
app.use('/lobby',lobbyRouter);

server.listen(3000,function(){
	console.log('on 3000');
});

module.exports = app;
