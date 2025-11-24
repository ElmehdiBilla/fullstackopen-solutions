const assert = require('node:assert');
const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("the unique identifier property of the blog posts is named id", async () => {
    const blogs = await helper.blogsInDb();
    const blog = blogs[0];
    assert(blog.id);
    assert(!blog._id);
})

test("a blog can be added ", async () => {
    const newBlog = {
        title: "new Blog",
        author: "Jhon doe",
        url: "https://newblog.example/",
        likes: 200
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const title = blogsAtEnd.map((b) => b.title);
    assert(title.includes("new Blog"));
});

after(async () => {
    await mongoose.connection.close();
});
