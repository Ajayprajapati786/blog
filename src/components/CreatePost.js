import React, { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


const CreatePost = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const handleCreatePost = async () => {
   
    const email = localStorage.getItem("email");
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toLocaleTimeString();
    
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    const newPost = { title, content, email, date, time };

    try {
      const response = await axios.post(
        "https://react-blog-7e3fa-default-rtdb.firebaseio.com/posts.json",
        newPost
      );

      console.log(response);
      alert("Post created");
      contentRef.current.value="";
      titleRef.current.value="";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Create a New Post</h1>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                ref={titleRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea
                className="form-control"
                id="content"
                rows="10"
                ref={contentRef}
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreatePost}
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
