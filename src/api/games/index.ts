import { gql } from "@apollo/client";

export const GET_GAMES = gql`
  query GetGames(
    $page: Int!
    $perPage: Int!
    $orderBy: String
    $order: String
  ) {
    all(
      params: {
        page: $page
        perPage: $perPage
        orderBy: $orderBy
        order: $order
      }
    ) {
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

export const GET_GAME = gql`
  query ShowGame($id: Int!) {
    show(id: $id) {
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

export const UPDATE_GAME = gql`
  mutation UpdateGame($updateBody: UpdateRequest!) {
    update(updateBody: $updateBody) {
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
