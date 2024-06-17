import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';
import { REPOSITORY_REVIEWS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryFields
      ...RepositoryReviews
    }
  }
  ${REPOSITORY_FIELDS}
  ${REPOSITORY_REVIEWS}
`;


      
export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;