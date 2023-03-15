import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation addGame(
    $name: String!
    $description: String
    $imgUrl: String
    $price: Float!
    $category: String!
    $seller: String   ## this will need to change -- we'll grab the users ObjectID from context
  ) {
    addGame(
      name: $name
      description: $description
      imgUrl: $imgUrl
      price: $price
      category: $category
      seller: $seller   ## this will need to change --  we'll grab the users ObjectID from context
    ) {
      game {
        _id
        name
      }
    }
  }
`;

// still needed
  // updateGame
  // deleteGame
  // addOrder

  // nice to have?
    // updateUser
    // deleteUser
