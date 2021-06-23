const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Users = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: Buffer,
  salt: Buffer,
});

const User = mongoose.model('users', Users);
module.exports = User;
