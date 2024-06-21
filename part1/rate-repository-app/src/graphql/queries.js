import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';
import { REPOSITORY_REVIEWS } from './fragments';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy , $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy , searchKeyword: $searchKeyword) {
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
query getCurrentUser($includeReviews: Boolean = false) {
  me {
      id
      username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          rating
          createdAt
          text
          repositoryId
           user {
           username
         }
        }
      }
    }
  }
}
`;