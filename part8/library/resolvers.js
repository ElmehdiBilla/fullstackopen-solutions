const Book = require('./models/book');
const Author = require('./models/author');
const { GraphQLError } = require('graphql');

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const filter = {};
            if (args.author) {
                const author = await Author.findOne({ name: args.author });
                if (author) filter.author = author._id;
            }
            if (args.genres && args.genres.length > 0) {
                filter.genres = { $all: args.genres };
            }

            const books = await Book.find(filter).populate('author');
            return books;
        },
        allAuthors: async () => Author.find({}),
    },
    Author: {
        bookCount: async (root) => {
            return await Book.find({ author: root.id }).countDocuments();
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            if (args.title.length < 5) {
                throw new GraphQLError(`The book title must be 5 or more characters long`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                    },
                });
            }
            if (args.author.length < 4) {
                throw new GraphQLError(`The author name must be 4 or more characters long`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author,
                    },
                });
            }
            const BookExists = await Book.exists({ title: args.title });

            if (BookExists) {
                throw new GraphQLError(`book title must be unique`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                    },
                });
            }
            let author = await Author.findOne({ name: args.author });
            if (!author) {
                author = new Author({ born: null, name: args.author });
                await author.save();
            }
            const book = new Book({ ...args, author: author._id });
            try {
                await book.save();
            } catch (error) {
                throw new GraphQLError(`Saving Book failed: ${error.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: { ...args },
                        error,
                    },
                });
            }
            return book.populate('author');
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name });

            if (!author) {
                return null;
            }
            author.born = args.setBornTo;
            try {
                await author.save();
            } catch (error) {
                throw new GraphQLError(`Saving Author failed: ${error.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: { ...args },
                        error,
                    },
                });
            }
            return author;
        },
    },
};

module.exports = resolvers;
