const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  serial:{
    type : String,
    required: true,
    unique: true,
  },
  sender: {
    type: String,
    required: true,
  },
  reciever: {
    type: String,
    required: true,
  }
},{timestamps: true});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;