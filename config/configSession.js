module.exports = (session, app, mongoose) => {
  const env = process.env.NODE_ENV || 'development';
  const ConnectMongo = require('connect-mongo')(session);
  if (env === 'development') {
    app.use(
      session({
        secret: process.env.sessionSecret,
        stringify: true,
        store: new ConnectMongo({
          mongooseConnection: mongoose.connection,
          stringify: true
        }),
        resave: true,
        saveUninitialized: true
      })
    );
  } else {
    app.use(
      session({
        secret: process.env.sessionSecret,
        store: new ConnectMongo({
          mongooseConnection: mongoose.connection,
          stringify: true
        }),
        resave: true,
        saveUninitialized: true
      })
    );
  }
};
