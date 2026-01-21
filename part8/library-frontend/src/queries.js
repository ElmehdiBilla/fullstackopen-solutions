import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            id
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            id
            title
            author {
                name
                born
                id
                bookCount
            }
            published
            genres
        }
    }
`;

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            id
            title
            author {
                name
                born
                id
                bookCount
            }
            published
            genres
        }
    }
`;

export const EDIT_AUTHOR_BIRTH = gql`
    mutation editAuthor($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
            id
            bookCount
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;
