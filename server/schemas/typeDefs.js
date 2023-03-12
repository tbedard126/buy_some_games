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
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
