import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
    const [visible, setVisible] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 5,
        marginBottom: 5,
    };

    const handleLike = () => {
        updateBlog({
            id: blog.id,
            user: blog.user,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url,
        });
    };

    return (
        <div style={blogStyle}>
            <div>
                {blog.title}
                &nbsp;
                <button onClick={() => setVisible(!visible)}>
                    {visible ? "hide" : "view"}
                </button>
                {visible && (
                    <div>
                        <a  href={blog.url}>{blog.url}</a>
                        <div>
                            likes {blog.likes}
                            &nbsp;
                            <button onClick={handleLike}>like</button>
                        </div>
                        <div>{blog.author}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
