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
    // give a default 'placeholder' img
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  // quantity: {          // this will always be 1
  //   type: Number,
  //   min: 0,
  //   default: 0
  // },
  category: {
    type: String,
    enum: ["Nintendo", "Super Nintendo", "Sega Genesis", "Nintendo 64"],
    required: true,
  },
  seller: {
    type: String,
    ref: "User",
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
