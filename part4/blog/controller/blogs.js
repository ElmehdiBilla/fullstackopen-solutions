const mongoose = require("mongoose");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    if (!request.body.title) {
        return response.status(400).json({ error: "title is missing" });
    }
    if (!request.body.url) {
        return response.status(400).json({ error: "url is missing" });
    }
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ error: "invalid id format" });
    }

    const deleteBlog = await Blog.findByIdAndDelete(request.params.id);

    if (!deleteBlog) {
        return response.status(404).json({ error: "blog not found" });
    }

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
