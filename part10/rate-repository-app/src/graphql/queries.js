import { gql } from '@apollo/client';
import { REPO_INFO, REVIEW_INFO } from './fragments';

export const GET_REPOSITORY = gql`
    query GetRepository($id: ID!, $first: Int, $after: String) {
        repository(id: $id) {
            ...RepoInfo
            reviews(first: $first, after: $after) {
                totalCount
                edges {
                    node {
                        ...ReviewInfo
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
            }
        }
    }
    ${REPO_INFO}
    ${REVIEW_INFO}
`;

export const GET_REPOSITORIES = gql`
    query GetRepositories(
        $first: Int
        $after: String
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
    ) {
        repositories(
            first: $first
            after: $after
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
        ) {
            totalCount
            edges {
                node {
                    ...RepoInfo
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
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
