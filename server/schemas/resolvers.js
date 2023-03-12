const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');    // will eventually import Order as well
const { signToken } = require('../utils/auth');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');    // will use this if we get to Stripe

const resolvers = {
  Query: {
    // get ALL games in DB
    allGames: async () => {
      return await Game.find();
    },
    // get ALL games by category
    gamesByCtgy: async (parent, { category }) => {
      return await Game.find({ category: category }).populate('seller');
    },
    // get ONE game by ID (will eventualy have to grab the ID from params)
    game: async (parent, { gameId }) => {
      return await Game.findById(gameId).populate('seller');
    },
    // get ONE seller (User) by ID
    seller: async (parent, { userId }) => {
      return await User.findById(userId).populate('games');
    },
    // GET all orders (by one user, buyer OR seller -- so this may need to be 2 separate routes),
    // ***nice to have**  get all users (sellers -- a new page, where they can sort by rating),
  },
  Mutation: {
    // CREATE one user -- currnetly verbatim for example
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // CREATE one game (will need a form for this -- also updates the seller's games array)
    addGame: async (parent, args, context) => {
      if (context.user) {
        const game = await Game.create({
          ...args,  //is spread necessary here? it may just copy
          seller: context.user._id});

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { games: game._id }}
        );

        return game;
      }
      throw new AuthenticationError('Only sellers can list games; login or sign-up first!');
    },
    // UPDATE user (would use the signup form logic)
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Must be logged in to update your biz');
    },
    // UPDATE one game by ID (will have to grab ID from params)
        // this one is incomplete
    // updateGame: async (parent, args) => {
    //   return await Game.findByIdAndUpdate(args._id, args, { new: true }); //not quite right -- ID should be from params
    // },

    // DELETE one game (also remove it from User's games array)
    removeGame: async (parent, { gameId }, context) => {
      if (context.user) {
        const game = await Game.findByIdAndDelete(gameId);

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { games: game._id } }
        );

        return game;
      }
      throw new AuthenticationError('You need to be logged in to unlist your game');
    },

    // DELETE one user (i.e. delete account -- should also 'cascade' delete the games in the assoc. array),

    // LOGIN (i.e. find one user and give JWT) -- keeping this one verbatim from the example
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
    // CREATE ORDER (from cart, which holds array of games (id) to buy -- once order submitted, THEN create)
      // this is the one from the example, so when we employ it we'll need to change some pieces, but the general logic should be similar
        // addOrder: async (parent, { products }, context) => {
        //   console.log(context);
        //   if (context.user) {
        //     const order = new Order({ products });

        //     await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        //     return order;
        //   }

        //   throw new AuthenticationError('Not logged in');
        // },
  }
};

module.exports = resolvers;
