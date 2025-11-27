const mongoose = require("mongoose");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
        return response
            .status(400)
            .json({ error: "UserId missing or not valid" });
    }
    if (!request.body.title) {
        return response.status(400).json({ error: "title is missing" });
    }
    if (!request.body.url) {
        return response.status(400).json({ error: "url is missing" });
    }

    const blog = new Blog(request.body);
    blog.user = user._id;

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
        return response.status(401).json({ error: "not authorized" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
        return response
            .status(401)
            .json({ error: "not authorized" });
    }

    const id = request.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ error: "invalid id format" });
    }

    const deleteBlog = await Blog.findById(request.params.id);

    if (!deleteBlog) {
        return response.status(404).json({ error: "blog not found" });
    }

    if (deleteBlog.user.toString() !== user._id.toString()) {
        return response
            .status(401)
            .json({ error: "not authorized" });
    }

    await deleteBlog.deleteOne();

    return response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
    const id = request.params.id;
    const { likes } = request.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ error: "invalid id format" });
    }

    const blogToUpdate = await Blog.findById(request.params.id);

    if (!blogToUpdate) {
        return response.status(404).json({ error: "blog  not found" });
    }

    try {
        if (likes !== undefined) {
            blogToUpdate.likes = likes;
        }
        const updatedBlog = await blogToUpdate.save();
        return response.status(200).json(updatedBlog);
    } catch (error) {
        if (error.name === "ValidationError") {
            return response
                .status(400)
                .json({ error: "likes is not a number" });
        }
        return response.status(500).json({ error: "Server error" });
    }
});

module.exports = blogsRouter;
