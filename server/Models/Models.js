const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: false,
  },
  message: {
    type: String,
    required: false,
    unique: false,
  },
  // room:{
  //     type: array,
  // }
});

exports.module = mongoose.model("User", userSchema);
