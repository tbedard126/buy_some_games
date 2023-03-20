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
  }

  type User {
    _id: ID!
    username: String!
    email: String!
 #    password: String!      # don't think this is needed #
    games: [Game]
  }


  ####### Stripe
  #  type Checkout {
  #    session: ID
  #  }

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
    getSellersGames(id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addGame(
      name: String!
      description: String
      imgUrl: String
      price: Float!
      category: String!
      seller: ID
    ): Game
    updateGame(
      id: ID!
      name: String
      description: String
      imgUrl: String
      price: Float
      category: String
    ): Game
    incrementGameViews(id: ID!, currViews: Int): Game
    removeGame(id: ID!): Game
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
