import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            blogService.setToken(user.token);
            setUser(user);
        }
    }, []);

    const removeNotification = (ms = 0) => {
      setTimeout(() => {
          setError(false);
          setMessage(null);
      }, ms);
    };

    const addBlog = async (event) => {
        event.preventDefault();
        const blog = {
            title,
            author,
            url,
        };

        try {
            const returnedBlog  = await blogService.create(blog);
            setBlogs(blogs.concat(returnedBlog));
            setTitle("");
            setAuthor("");
            setUrl("");
            setMessage(`a new blog ${returnedBlog.title} added`);
            removeNotification(5000);
        } catch (error) {
            setError(true);
            setMessage(error.response.data.error);
            removeNotification(5000)
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem("loggedUser", JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (error) {
            setError(true);
            setMessage(error.response.data.error);
            removeNotification(5000)
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem("loggedUser");
        window.location.reload();
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            <div>
                <label>
                    username
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </label>
            </div>
            <button type="submit">login</button>
        </form>
    );

    const blogForm = () => (
        <form onSubmit={addBlog}>
            <h2>create new blogs</h2>
            <div>
                <label>
                    title
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    author
                    <input
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    url
                    <input
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </label>
            </div>
            <button type="submit">create</button>
        </form>
    );

    return (
        <div>
            <Notification message={message} error={error} />

            {!user && loginForm()}

            {user && (
                <div>
                    <h2>blogs</h2>
                    <p>
                        {user.name} logged in{" "}
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    {blogForm()}
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
