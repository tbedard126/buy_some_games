import { gql } from "@apollo/client";

export const QUERY_GAME = gql`
  query getGame($id: ID!) {
    game(id: $id) {
      _id
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

export const QUERY_SELLERS_GAMES = gql`
  query getSellersGames($id: ID!) {
    getSellersGames(id: $id) {
      games {
        _id
        name
        description
        imgUrl
        price
        views
        category
      }
    }
  }
`;
