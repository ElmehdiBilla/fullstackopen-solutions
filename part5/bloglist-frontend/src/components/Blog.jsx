import { useState } from "react";

const Blog = ({ blog }) => {
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
                        <div>{blog.url}</div>
                        <div>
                            likes {blog.likes}
                            &nbsp;
                            <button>like</button>
                        </div>
                        <div>{blog.author}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
