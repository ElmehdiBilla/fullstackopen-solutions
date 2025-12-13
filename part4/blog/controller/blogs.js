const mongoose = require("mongoose");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
    if (!request.user.id) {
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

    const user = await User.findById(request.user.id);
    const blog = new Blog(request.body);
    blog.user = user._id;

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const populatedBlog = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1 });

    response.status(201).json(populatedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
    const user = request.user;

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

    if (deleteBlog.user.toString() !== user.id.toString()) {
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
        const populatedBlog = await Blog.findById(updatedBlog.id).populate('user', { username: 1, name: 1 });
        return response.status(200).json(populatedBlog);
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
