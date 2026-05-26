import { gql } from '@apollo/client';

export const REPO_INFO = gql`
    fragment RepoInfo on Repository {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
        url
    }
`;

export const REVIEW_INFO = gql`
    fragment ReviewInfo on Review {
        id
        text
        rating
        createdAt
        repositoryId
        user {
            id
            username
        }
    }
`;
