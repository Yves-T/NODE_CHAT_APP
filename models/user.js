const mongoose = require('mongoose');

// define the schema for our user model
var userSchema = new mongoose.Schema({
  profileID: String,
  fullname: String,
  profilePic: String,
  email: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
