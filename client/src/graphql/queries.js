import { gql } from '@apollo/client';

export const QUERY_GAME = gql`
  query getGame($id: ID!) {
    game(_id: $id) {
      category
      description
      imgUrl
      name
      price
      seller
      views
    }
  }
`;

export const QUERY_GAMES_BY_CAT = gql`
  query getGamesByCat($category: String) {
    gamesByCtgy(category: $category) {
        _id
      imgUrl
      name
      price
      seller
    }
  }
`;

export const QUERY_ALL_GAMES = gql`
  {
    games {
      _id
      category
      imgUrl
      name
      price
      seller
    }
  }
`;

// still needed:
  // games by user (seller)
  // orders?