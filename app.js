//app.js
//load required modules
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var favicon = require('serve-favicon');

//set app
var app = express();
var appEnvironment = process.env.NODE_ENV;

/* Routes Listed Here */
var appRouter = require('./routers/appRouter');
var storiesRouter = require('./routers/storiesRouter');
var storyRouter = require('./routers/storyRouter');
var charactersRouter = require('./routers/charactersRouter');
var characterRouter = require('./routers/characterRouter');
var tribeRouter = require('./routers/tribeRouter');
var tribesRouter = require('./routers/tribesRouter');
var userRouter = require('./routers/userRouter');
var errorRouter = require('./routers/errorRouter');

/* Loads a Mongo DB */
var configDB, doesExist;
if (appEnvironment === 'development' || typeof appEnvironment === 'undefined') {
	try {
    	configDB = require('./config/localhost/db.js');
	} catch (e) {
    	configDB = require('./config/db.js');
	}
} else {
	configDB = require('./config/db.js');
}
var DBConfigURL = configDB.url;
mongoose.connect(DBConfigURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error.'));
db.once('open', function (callback) {
  console.log('WE HAVE MONGO CONNECTION YO!');
});


// use configurations and dependences
var configPass = require('./routers/passport')(passport); // pass passport for configuration
app.use(cors());
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
//used for express
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// required for passport
app.use(session({ secret: 'ilovepineguinsyoushouldtoo' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

/* APP LEVEL ROUTING TO ROUTE METHODS */
app.use('/', appRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/story', storyRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/character', characterRouter);
app.use('/api/tribes', tribesRouter);
app.use('/api/tribe', tribeRouter);
app.use('/user', userRouter);
app.use('/error', errorRouter);


var server = app.listen((process.env.PORT || 3000), function () {
  var host = server.address().address;
  var port = server.address().port;
});
