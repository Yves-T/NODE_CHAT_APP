const logger = require('../logger');

module.exports = (passport, GoogleStrategy) => {
  const UserModel = require('../models/user');

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

// used to deserialize the user
  passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
      if (err) {
        logger.error('MongoDB Error: ', err);
      }
      done(err, user);
    });
  });

  const googleOptions = {
    clientID: process.env.googleId,
    clientSecret: process.env.googleSecret,
    callbackURL: process.env.googleCallBack
  };

  passport.use(new GoogleStrategy(googleOptions,
    (token, refreshToken, profile, done) => {
      UserModel.findById({profileID: profile.id}, (err, result) => {
        if (err) {
          logger.error('MongoDB Error: ', err);
          return done(err);
        }

        if (result) {
          // found user
          done(null, result);
        } else {
          // create a new user
          const newChatUser = new UserModel({
            profileID: profile.id,
            fullname: profile.displayName,
            profilePic: profile.photos[0].value || '',
            email: profile.emails[0].value
          });

          newChatUser.save(err => {
            if (err) {
              logger.error('MongoDB Error: ', err);
              throw err;
            }

            done(null, newChatUser);
          });
        }
      });
    })
  );
};
