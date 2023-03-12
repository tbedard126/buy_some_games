const { gql } = require('apollo-server-express');

// may want to add 'quantity' field to Game type

// may want to add 'rating' and 'logoUrl' fields to User (seller)

const typeDefs = gql`
  type Game {
    _id: ID!
    name: String!
    description: String
    imgUrl: String
    price: Float!
    category: String!
    seller: User
  }

  type User {
    _id: ID!
    userame: String!
    email: String!
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
    games: [Games]
    gamesByCtgy(category: String): [Games]
    game(_id: ID!): Game
    seller(_id: ID!): User
    ### GET ALL ORDERS (once that function is written) ###
    ### **nice to have** gets all users ###
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addGame(name: String!, description: String, imgUrl: String, price: Float!, category: String!, seller: ID): Game
    updateUser(username: String, email: String, password: String): User
    ### update game ###
    removeGame(_id: ID!): Game
    ### remove user ###
    login(email: String!, password: String!): Auth
      ### will implement once we add Order ###
#       addOrder(products: [ID]!): Order
  }
`;

module.exports = typeDefs;
