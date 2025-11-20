const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    return [...blogs].sort((blogA, blogB) => blogB.likes - blogA.likes)[0];
};

const mostBlogs = (blogs) => {
    const authors = _.chain(blogs)
        .countBy("author")
        .map((blogs, author) => ({ author, blogs }))
        .orderBy(["blogs"], ["desc"])
        .value();
				
    return authors[0];
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
};
