const mongoose = require('mongoose');

module.exports = () => {
  mongoose.Promise = require('bluebird');
  mongoose.connect(process.env.dbUrl, {
    promiseLibrary: require('bluebird')
  });
  return mongoose;
};
