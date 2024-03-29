import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
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
    $seller: ID 
  ) {
    addGame(
      name: $name
      description: $description
      imgUrl: $imgUrl
      price: $price
      category: $category
      seller: $seller
    ) {
      _id
      name
    }
  }
`;

export const UPDATE_GAME = gql`
  mutation updateGame(
    $id: ID!
    $name: String!
    $description: String
    $imgUrl: String
    $price: Float!
    $category: String!
    ) {
    updateGame(
      id: $id
      name: $name
      description: $description
      imgUrl: $imgUrl
      price: $price
      category: $category
    ) {
      _id
      name
      description
      category
      price
      imgUrl
      views
    }
  }
`;

export const INCREMENT_GAME_VIEWS = gql`
  mutation incrementGameViews(
    $id: ID!
    $currViews: Int
    ) {
    incrementGameViews(
      id: $id
      currViews: $currViews
    ) {
      _id
       name
      description
      category
      price
      imgUrl
      views
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($id: ID!) {
    removeGame(id: $id) {
      name
    }
  }
`;
