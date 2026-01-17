const Book = require('./models/book');
const Author = require('./models/author');

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            // filters missing
            return Book.find({}).populate('author');
        },
        allAuthors: async () => Author.find({}),
    },
    Author: {
        bookCount: (root) => {
            return 0;
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
            await  book.save();
            return book.populate('author');
        },
        editAuthor: (root, args) => {
            let author = authors.find((a) => a.name === args.name);

            if (!author) {
                return null;
            }
            author = { ...author, born: args.setBornTo };
            authors = authors.map((a) => (a.name === author.name ? author : a));
            return author;
        },
    },
};

module.exports = resolvers;
