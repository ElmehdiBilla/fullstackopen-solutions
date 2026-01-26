const Book = require('./models/book');
const Author = require('./models/author');
const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const pubsub = new PubSub();

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
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Author: {
        bookCount: async (root) => {
            return await Book.find({ author: root.id }).countDocuments();
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                });
            }
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
            const bookDetails = book.populate('author');
            pubsub.publish('BOOK_ADDED', { bookAdded: bookDetails });
            return bookDetails;
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                });
            }
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
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

            return user.save().catch((error) => {
                throw new GraphQLError(`Creating the user failed: ${error.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: { ...args },
                        error,
                    },
                });
            });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
        },
    },
};

module.exports = resolvers;
