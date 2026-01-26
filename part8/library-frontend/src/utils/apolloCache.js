import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from '../queries';

export const addBookToCache = (cache, bookToAdd) => {
    cache.updateQuery({ query: ALL_BOOKS, variables: { genres: [] } }, ({ allBooks }) => {
        const bookExists = allBooks.some((book) => book.id === bookToAdd.id);

        if (bookExists) {
            return { allBooks };
        }

        return {
            allBooks: allBooks.concat(bookToAdd),
        };
    });

		cache.updateQuery({ query: ALL_GENRES }, ({ allBooks }) => {
        return {
            allBooks: allBooks.concat({ __typename: 'Book', genres: bookToAdd.genres }),
        };
    });

		cache.updateQuery({ query: ALL_AUTHORS}, ({ allAuthors }) => {
        const authorExists = allAuthors.some((author) => author.id === bookToAdd.author.id);

        if (authorExists) {
            return { allAuthors };
        }

        return {
            allAuthors: allAuthors.concat(bookToAdd.author),
        };
    });
};
