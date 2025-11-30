import { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
    const [visible, setVisible] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 5,
        marginBottom: 5,
    };

    const deleteBtn = {
        backgroundColor: '#f55',
        borderColor: '#f00',
        borderRadius: 3,
        borderWidth: 1,
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

    const handleDelete = () => {
        if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog.id);
        }
    };

    return (
        <div style={blogStyle}>
            <div>
                {blog.title}
                &nbsp;
                <button onClick={() => setVisible(!visible)}>
                    {visible ? 'hide' : 'view'}
                </button>
                {visible && (
                    <div>
                        <a href={blog.url}>{blog.url}</a>
                        <div>
                            likes {blog.likes}
                            &nbsp;
                            <button onClick={handleLike}>like</button>
                        </div>
                        <div>{blog.author}</div>
                        {deleteBlog && (
                            <button style={deleteBtn} onClick={handleDelete}>
                                delete
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
