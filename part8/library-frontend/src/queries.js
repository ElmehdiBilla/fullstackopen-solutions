import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
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
`;

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
    query allBooks($genres: [String!]) {
        allBooks(genres: $genres) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const ALL_GENRES = gql`
    query {
        allBooks {
            genres
        }
    }
`;

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
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

export const ME = gql`
    query {
        me {
            favoriteGenre
            id
            username
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;
