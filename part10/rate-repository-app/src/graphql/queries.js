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
    query {
        repositories {
            edges {
                node {
                    ...RepoInfo
                }
            }
        }
    }
    ${REPO_INFO}
`;

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;
