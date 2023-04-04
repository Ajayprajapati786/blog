import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useHistory } from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();


  const loginIdRef = useRef(null);
  const passwordRef = useRef(null);

 const getRole=(email)=>{
    // let obj;
    axios
    .get(
      `https://react-blog-7e3fa-default-rtdb.firebaseio.com/role.json`
    )
    .then((response) => {
      console.log(response.data);
       const obj = response.data;
       for (const key in obj) {
        if (obj[key].email === email) {
          console.log(obj[key].role);
          const role = obj[key].role;
          if (role !== undefined && role !== null) {
            const roleString = role.toString();
            // localStorage.setItem("rolettttttttt", roleString);
            dispatch(authActions.role({role:roleString}));
          }
        }
      }
      
    })
    .catch((error) => {
      console.log(error);
    });

 
 }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const loginId = loginIdRef.current.value;
    const password = passwordRef.current.value;
  
    const data = {
      email: loginId,
      password: password,
      returnSecureToken: true,
    };
  
    if (loginId === "" || password === "") {
      alert("please enter both email and password");
      return;
    } else {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBV6RdwvkwbLwk4szZWp6yR_-x5bUN44fs",
          data
        );
        getRole(response.data.email);
        console.log(data);
        dispatch(authActions.login({token:response.data.idToken, email:response.data.email}));
      
        history.push("/");
        console.log("success");
      } catch (error) {
        alert(error.response.data.error.message);

      }
    }

    
  };
  
  return (
    <Form onSubmit={handleSubmit} className="container mt-3">
      <h1 className="text-center">Sign In</h1>
      <Form.Group controlId="formLoginId">
        <Form.Label>Login ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter login ID"
          ref={loginIdRef}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </Form.Group>

      <div className="text-center">
        <Button type="submit" className="mt-2">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default Login;
