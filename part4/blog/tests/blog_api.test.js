const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

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
});

test("a blog can be added ", async () => {
    const newBlog = {
        title: "new Blog",
        author: "Jhon doe",
        url: "https://newblog.example/",
        likes: 200,
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

test("if request missing (likes) property (0) will be the default value", async () => {
    const newBlog = {
        title: "blog without likes property",
        author: "Jhon doe",
        url: "https://blogwithoutlikes.example/",
    };

    const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    assert.strictEqual(response.body.likes, 0);
});

test("blog without title get 400 Bad Request", async () => {
    const blogNoTitle = {
        author: "Jhon doe",
        url: "https://blogwithoutlikes.example/",
    };

    await api.post("/api/blogs").send(blogNoTitle).expect(400);
});

test("blog without url get 400 Bad Request", async () => {
    const blogNoUrl = {
        title: "blog without url",
        author: "Jhon doe",
    };

    await api.post("/api/blogs").send(blogNoUrl).expect(400);
});

describe("deletion of a blog", () => {
    test("a blog can be deleted", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
        const blogsAtEnd = await helper.blogsInDb();
        const ids = blogsAtEnd.map((b) => b.id);

        assert(!ids.includes(blogToDelete.id));
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    });

    test("invalid id format get 400 Bad Request", async () => {
        const invalidId = "12345";

        await api.delete(`/api/blogs/${invalidId}`).expect(400);
        const blogsAtEnd = await helper.blogsInDb();

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("blog does not exist get 404 Not Found", async () => {
        const nonExistingId = new mongoose.Types.ObjectId().toString();

        await api.delete(`/api/blogs/${nonExistingId}`).expect(404);
        const blogsAtEnd = await helper.blogsInDb();

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
});

describe("updating a blog", () => {
    test("blog likes can be updated", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];
        const likes = blogToUpdate.likes + 1;

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes })
            .expect(200);

        const blogsAtEnd = await helper.blogsInDb();
        const updatedBlog = blogsAtEnd[0];
        assert.strictEqual(updatedBlog.likes, likes);
    });

    test("invalid id format get 400 Bad Request", async () => {
        const invalidId = "12345";
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];
        const likes = blogToUpdate.likes + 1;

        await api.put(`/api/blogs/${invalidId}`).send({ likes }).expect(400);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogToUpdate.likes, blogsAtEnd[0].likes);
    });

    test("blog does not exist get 404 Not Found", async () => {
        const nonExistingId = new mongoose.Types.ObjectId().toString();

        await api
            .put(`/api/blogs/${nonExistingId}`)
            .send({ likes: 0 })
            .expect(404);
    });

    test("no update if likes is null", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({})
            .expect(200);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogToUpdate.likes, blogsAtEnd[0].likes);
    });

    test("likes type not number get 400 Bad Request", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];
        const likes = "abc";

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes })
            .expect(400);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogToUpdate.likes, blogsAtEnd[0].likes);
    });
});

after(async () => {
    await mongoose.connection.close();
});
