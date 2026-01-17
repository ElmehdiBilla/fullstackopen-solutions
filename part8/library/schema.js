const typeDefs = /* GraphQL */ `
    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }
    type Book {
        id: String!
        title: String!
        author: Author!
        published: Int!
        genres: [String!]
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
    type Mutation {
        addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`;

module.exports = typeDefs;