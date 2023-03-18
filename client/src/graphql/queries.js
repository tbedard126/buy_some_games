import { gql } from "@apollo/client";

export const QUERY_GAME = gql`
  query getGame($id: ID!) {
    game(id: $id) {
      category
      description
      imgUrl
      name
      price
      seller {
        username
      }
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
      seller {
        username
      }
      views
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
      seller {
        username
      }
      views
    }
  }
`;

// still needed:
// games by user (seller -- could either query the user and populate their games,
//                    OR query games passing in the user
// orders?
