const { AuthenticationError } = require("apollo-server-express");
const { User, Game } = require("../models"); // will eventually import Order as well
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');    // will use this if we get to Stripe

const resolvers = {
  Query: {
    // get ALL games in DB
    games: async () => {
      try {
        return await Game.find({}).populate("seller");
      } catch (e) {
        console.log(`Error @ 'game' query: ${e}`);
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
      console.log('args:' + args, + '.. context: ' + context.user._id );
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
    // Create one game, without context/auth (interim) -- right now seller is a just a string
    // addGame: async (parent, args, context) => {
    //   // wrap this in a 'has JWT token i.e. isLoggedIn' if statement, with an autherror afterward
    //   const game = await Game.create({ ...args }); // this will expand out to be args AND 'seller: context.user._id'
    //   console.log(`args: ${{args}} .. context.user._id: ${context.user._id}`);

    //   await User.findOneAndUpdate(
    //     { username: "skippy" }, // this will be by ID thru context
    //     { $addToSet: { games: game.id } }
    //   );

    //   return game;
    // },

    // UPDATE one game by ID (will have to grab ID from params)
    // THIS IS NON-AUTH VERSION WHERE WE PASS THE NAME IN INSTEAD OF ID
    // will need to pass in context for auth, wrap it in an 'if' -- though we WONT need any user fields here
    updateGame: async (parent, args) => {
      const { name, ...restArgs } = args;
      const rest = { ...restArgs };
      return await Game.findOneAndUpdate({ name }, rest, { new: true });
    },

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
      throw new AuthenticationError(
        "You need to be logged in to unlist your game"
      );
    },

    // DELETE one user (i.e. delete account -- should also 'cascade' delete the games in the assoc. array),

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
    // also need a LOGOUT mutation

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

    // UPDATE user (would use the signup form logic)
    // may not use
    // updateUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return await User.findByIdAndUpdate(context.user._id, args, { new: true });
    //   }

    //   throw new AuthenticationError('Must be logged in to update your biz');
    // },
  },
};

module.exports = resolvers;
