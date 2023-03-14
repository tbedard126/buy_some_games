const mongoose = require("mongoose");

const { Schema } = mongoose;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
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
    type: String,     // will change this to ObjectID
    ref: "User",
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
