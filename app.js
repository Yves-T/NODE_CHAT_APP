const express = require('express');
const app = express();
const path = require('path');
const hogan = require('hogan-express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const mongoose = require('./config/configMongoose')();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const rooms = [];

app.engine('html', hogan);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
require('./config/configSession')(session, app, mongoose);

app.use(passport.initialize());
app.use(passport.session());
require('./auth/passportAuth')(passport, GoogleStrategy, mongoose);

require('./routes/routes')(app, passport, rooms);

app.set('port', process.env.PORT || 3000);
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
require('./socket/socket')(io, rooms);
server.listen(app.get('port'), () => {
  console.log('Server listening on port 3000');
});
