import { gql } from '@apollo/client';
import { REPO_INFO, REVIEW_INFO } from './fragments';

export const GET_REPOSITORY = gql`
    query GetRepository($id: ID!) {
        repository(id: $id) {
            ...RepoInfo
            reviews {
                edges {
                    node {
                        ...ReviewInfo
                    }
                }
            }
        }
    }
    ${REPO_INFO}
    ${REVIEW_INFO}
`;

export const GET_REPOSITORIES = gql`
    query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                    ...RepoInfo
                }
            }
        }
    }
    ${REPO_INFO}
`;

export const GET_CURRENT_USER = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        ...ReviewInfo
                    }
                }
            }
        }
    }
    ${REVIEW_INFO}
`;
