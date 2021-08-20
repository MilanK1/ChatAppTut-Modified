const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
    unique: false
  },
  message: {
    type: String,
    required: false,
    unique: false,
  }
});

exports.module = mongoose.model("User", userSchema);
