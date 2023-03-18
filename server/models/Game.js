const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: 'No description for this game'
  },
  imgUrl: {
    type: String,
    default: './images/blank-cartridge.jpg'
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  views: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: String,
    enum: ["Nintendo", "Super Nintendo", "Sega Genesis", "Nintendo 64"],
    required: true,
  },
  seller: {
    // type: Types.ObjectId,     // will change this to ObjectID
    // ref: "User",
    type: String
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
