import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const PostDetails = () => {
  const { postId } = useParams(); // access the postId parameter from the URL
  const [post, setPost] = useState(null); // state to store the post data

  useEffect(() => {
    axios
      .get(`https://react-blog-7e3fa-default-rtdb.firebaseio.com/posts/${postId}.json`)
      .then((response) => {
        setPost(response.data); // update the state with the post data
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  return (
    <div className="container my-4">
      {post ? (
        <Card>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{post.email}</Card.Subtitle>
            <Card.Text>{post.content}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              {post.date} {post.time}
            </small>
          </Card.Footer>
         
        </Card>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetails;
