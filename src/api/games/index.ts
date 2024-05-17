import { gql } from "@apollo/client";

export const GET_GAMES = gql`
  query GetGames($page: Int!, $perPage: Int!) {
    all(params: { page: $page, perPage: $perPage }) {
      list {
        id
        name
        slug
        year
        description
      }
      pagination {
        page
        count
        perPage
        countPages
      }
    }
  }
`;
//StoreRequest in ($createBody: StoreRequest!) - is taken from server side schema.gql
export const STORE_GAME = gql`
  mutation StoreGame($createBody: StoreRequest!) {
    store(createBody: $createBody) {
      id
      name
      slug
      year
      description
    }
  }
`;

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    destroy(id: $id) {
      id
      name
    }
  }
`;
