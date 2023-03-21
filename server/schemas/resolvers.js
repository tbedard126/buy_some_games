const { AuthenticationError } = require("apollo-server-express");
const { User, Game } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');    // will use this if we get to Stripe

const resolvers = {
  Query: {
    // get ALL games in DB
    games: async () => {
      try {
        return await Game.find({}).populate("seller");
      } catch (error) {
        console.log(`Error @ 'game' query: ${error}`);
      }
    },
    // get ALL games by category
    gamesByCtgy: async (parent, { category }) => {
      return await Game.find({ category: category }).populate("seller");
    },
    // get ONE game by ID (will eventualy have to grab the ID from params)
    game: async (parent, { id }) => {
      return await Game.findById(id).populate("seller");
    },
    // get ONE seller (User) by ID
    getSellersGames: async (parent, { id }) => {
      return await User.findById(id).populate("games");
    },
  },
  Mutation: {
    // CREATE one user -- currently verbatim from example
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // CREATE one game (will need a form for this -- also updates the seller's games array)
    addGame: async (parent, args, context) => {
      if (context.user) {
        const game = await Game.create({ ...args });
        console.log(game);

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { games: game._id }}
        );

        return game;
      }
      throw new AuthenticationError('Only sellers can list games; login or sign-up first!');
    },
    // UPDATE one game by ID
    updateGame: async (parent, args, context) => {
      if (context.user) {
        const { id, ...restArgs } = args;
        const rest = { ...restArgs };
        return await Game.findOneAndUpdate({ _id: id }, rest, { new: true });
      }
      throw new AuthenticationError(
        "You need to be logged in to change your game's data"
      );
    },
    // UPDATE game by ID -- only for incrementing its 'views' field by one
    incrementGameViews: async (parent, { id, currViews}) => {
      try {
        return await Game.findOneAndUpdate({ _id: id }, {views: (currViews + 1)}, { new: true });
      } catch(error) {
        console.log(`Error @ 'incrementGameView' query: ${error}`);
      }
    },
    // DELETE one game (also remove it from User's games array)
    removeGame: async (parent, { id }, context) => {
      if (context.user) {
        const game = await Game.findByIdAndDelete(id);

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { games: id } }
        );

        return game;
      }
      throw new AuthenticationError(
        "You need to be logged in to unlist your game"
      );
    },
    // LOGIN (i.e. find one user and give JWT) -- keeping this one verbatim from the example
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
