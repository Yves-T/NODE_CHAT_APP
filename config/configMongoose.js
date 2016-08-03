const mongoose = require('mongoose');
const logger = require('../logger');

module.exports = () => {
  logger.log('debug', 'Now my debug messages are written to console!');
  mongoose.Promise = require('bluebird');
  mongoose.connect(process.env.dbUrl, {
    promiseLibrary: require('bluebird')
  }, error => {
    logger.error('MongoDB Error: ', error);
  });

  return mongoose;
};
