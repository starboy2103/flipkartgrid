const mongoose = require("mongoose");

const DecaySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  serial:{
    type : String,
    required: true,
    unique: true,
  },
  NftId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Decay = mongoose.model("Decay", DecaySchema);

module.exports = Decay;