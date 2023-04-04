import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Row, Col, Form } from "react-bootstrap"; // Import Form component from react-bootstrap
import Pagination from "./Pagination";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(""); // Initialize searchTerm state variable

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

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) // Filter posts based on searchTerm
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  return (
    <div className="container">
      <Form.Group controlId="searchBar" className="mt-3"> {/* Add search bar */}
        <Form.Control
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </Form.Group>
      <Row className="my-2">
        {currentPosts.map((post) => (
          <Col key={post.id} md={6} className="my-2">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                <Link to={`/posts/${post.id}`}>
                  <Button variant="primary">Read More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Posts;
