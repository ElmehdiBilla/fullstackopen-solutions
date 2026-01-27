const DataLoader = require('dataloader');
const Book = require('./models/book');

const batchBookCounts = async (authorIds) => {
    const books = await Book.find({ author: { $in: authorIds } });
    return authorIds.map((authorId) => books.filter((b) => b.author._id.toString() === authorId.toString()).length);
};

const createLoaders = () => {
    return {
        bookCount: new DataLoader(batchBookCounts),
    };
};

module.exports = createLoaders;
