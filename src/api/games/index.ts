import { gql } from "@apollo/client";

export const GET_GAMES = gql`
  query GetGames($skip: Float!) {
    index(params: { skip: $skip }) {
      id
      name
      slug
      year
      description
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
