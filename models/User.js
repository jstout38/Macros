const mongoose = require('mongoose');
const { Schema } = mongoose;

//Create mongoose model for Users
const userSchema = new Schema({
  googleId: String
});

//Create model on require 
module.exports = mongoose.model('users', userSchema);