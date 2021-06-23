const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const Users = new Schema({
  username: String,
  password: Buffer,
  salt: Buffer,
});

const User = mongoose.model('users', Users);
module.exports = User;
