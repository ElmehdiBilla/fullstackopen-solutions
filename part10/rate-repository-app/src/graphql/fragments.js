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
