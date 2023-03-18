const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Game {
    _id: ID!
    name: String!
    description: String
    imgUrl: String
    price: Float!
    views: Int
    category: String!
    seller: User
  # seller: String
  }

  type User {
    _id: ID!
    username: String!      # TYPO HERE #
    email: String!
 #    password: String!      # is this supposed to be in here? #
    games: [Game]
  }

  #  type Order {
  #    _id: ID
  #    purchaseDate: String
  #    games: [Game]
  #  }

  ####### Stripe
  type Checkout {
    session: ID
  }
  ####### JWT
  type Auth {
    token: ID
    user: User
  }

  ######## server/resolvers -- these are not our ones currently
  type Query {
    games: [Game]
    gamesByCtgy(category: String): [Game]
    game(id: ID!): Game
    seller(_id: ID!): User
    ### GET ALL ORDERS (once that function is written) ###
    ### **nice to have** gets all users ###
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addGame(
      name: String!
      description: String
      imgUrl: String
      price: Float!
      category: String!
      seller: ID  # is this right?
#      seller: String
    ): Game

    updateGame(
      name: String
      description: String
      imgUrl: String
      price: Float
      category: String
    ): Game
    removeGame(_id: ID!): Game
    login(email: String!, password: String!): Auth

  ## still to add:
  #    addOrder(games: [ID]!): Order
  #    logout
  #    increment views (on a game)

  ## still to MAYBE add:
  #    updateUser(username: String, email: String, password: String): User
  #    removeUser(_id: ID!): User
  }
`;

module.exports = typeDefs;
