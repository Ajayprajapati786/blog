import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const EditPost = () => {
  const [posts, setPosts] = useState([]);
  const userEmail = localStorage.getItem("email");
  const userRole = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://react-blog-7e3fa-default-rtdb.firebaseio.com/posts.json"
        );
        const postsData = response.data;
        const postsArray = Object.entries(postsData).map(
          ([postId, postData]) => ({
            id: postId,
            ...postData,
          })
        );
        setPosts(postsArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `https://react-blog-7e3fa-default-rtdb.firebaseio.com/posts/${postId}.json`
      );
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (postId, updatedPostData) => {
    try {
      await axios.patch(
        `https://react-blog-7e3fa-default-rtdb.firebaseio.com/posts/${postId}.json`,
        updatedPostData
      );
      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, ...updatedPostData } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Post</h1>
      {userRole === "admin" ? (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              {/* <p>{post.id}</p> */}
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button className="btn btn-danger mx-1" onClick={() => handleDelete(post.id)}>Delete</button>
              <button
                className="btn btn-primary mx-1"
                onClick={() => {
                  const updatedTitle = prompt("Enter updated title:");
                  const updatedContent = prompt("Enter updated content:");
                  if (updatedTitle || updatedContent) {
                    handleEdit(post.id, {
                      title: updatedTitle || post.title,
                      content: updatedContent || post.content,
                    });
                  }
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {posts
            .filter((post) => post.email === userEmail)
            .map((post) => (
              <div key={post.id}>
                {/* <p>{post.id}</p> */}
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <button className="btn btn-danger mx-1" onClick={() => handleDelete(post.id)}>Delete</button>
                <button
                className="btn btn-primary mx-1"
                  onClick={() =>{
                    const updatedTitle = prompt("Enter updated title:");
                    const updatedContent = prompt("Enter updated content:");
                    if (updatedTitle || updatedContent) {
                      handleEdit(post.id, {
                        title: updatedTitle || post.title,
                        content: updatedContent || post.content,
                      });
                    }
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default EditPost;
