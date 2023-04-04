import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";


const Signup = () => {
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const userTypeRef = useRef();


  const handleRole=(role,email)=>{
    const data = {
        email:email,
        role:role
    }

    axios
    .post(
      `https://react-blog-7e3fa-default-rtdb.firebaseio.com/role.json`,
      data
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const userType = userTypeRef.current.value;

   

    const data = {
        email: email,
        password: password,
        returnSecureToken: true,
      };
    

    if (password !== confirmPassword) {
      alert("Password and confirm password must match");
    } else {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBV6RdwvkwbLwk4szZWp6yR_-x5bUN44fs",
          data
        )
        .then((response) => {
          console.log(response.data);
          // Handle successful sign up
          alert("Account created succesfully");
        history.push("/login");

        })
        .catch((error) => {
          console.log(error);
          // Handle error
        });
    }

    handleRole(userType,email);
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit} className="container mt-3">
        <h1 className="text-center">Signup</h1>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" ref={confirmPasswordRef} required />
        </Form.Group>

        <Form.Group controlId="formUserType">
  <Form.Label>User Type</Form.Label>
  <Form.Control as="select" ref={userTypeRef}>
    <option value="admin" disabled>Admin</option>
    <option value="author">Author</option>
    <option value="reader">Reader</option>
  </Form.Control>
</Form.Group>

        <div className="text-center">
          <Button type="submit" className="mt-2">
            Sign up
          </Button>
        </div>
      </Form>

      <p className="text-center">
        Already an account <Link to="/login">Sign In </Link>
      </p>
    </div>
  );
};

export default Signup;
