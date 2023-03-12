const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');    // will eventually import Order as well
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
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
  }
};



// mutations
    // CREATE one user (similar to sign up)
    // UPDATE user (would use thes signup form logic)
    // DELETE one user (i.e. delete account -- should also 'cascade' delete the games in the assoc. array)

    // CREATE one game (will need a form for this)
    // UPDATE one game (probably just price -- probly can use the same form as CREATE game)
    // DELETE one game (remember to remove it from User's games array)

    // CREATE ORDER (from cart, which holds array of games (id) to buy -- once order submitted, THEN create)

module.exports = resolvers;
