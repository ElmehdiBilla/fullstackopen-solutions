const Book = require('./models/book');
const Author = require('./models/author');

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
            let author = await Author.findOne({ name: args.author });
            if (!author) {
                author = new Author({ born: null, name: args.author });
                await author.save();
            }
            const book = new Book({ ...args, author: author._id });
            await book.save();
            return book.populate('author');
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name });

            if (!author) {
                return null;
            }
            author.born = args.setBornTo;
            await author.save();
            return author;
        },
    },
};

module.exports = resolvers;
