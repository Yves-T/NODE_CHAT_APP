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

app.engine('html', hogan);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
require('./config/configSession')(session, app, mongoose);

app.use(passport.initialize());
app.use(passport.session());
require('./auth/passportAuth')(passport, GoogleStrategy, mongoose);

require('./routes/routes')(app, passport);

app.listen(3000, () => console.log('Server listening on port 3000'));
