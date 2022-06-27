const mongoose = require('mongoose');
const config = require('../db');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

const UserModel = config.users.model('users', UserSchema);

module.exports = UserModel;
