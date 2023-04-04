import { Switch, Route } from "react-router-dom";
import "./App.css";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Posts from "./components/Posts";
import Signup from "./components/SignUp";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost"
import { useSelector } from "react-redux";
import Message from "./components/Message";

function App() {
  const message = "you are not authorise";
  const role = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      {/* <CreatePost/> */}
      {/* <Login/> */}
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Posts />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/posts/:postId">
          {" "}
          <PostDetails />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/createpost">
          {isAuthenticated&&(role=='admin' || role=='author')&&(<CreatePost />)}
          {isAuthenticated&&(role!='admin' && role!='author')&&(<Message/>)}  
        </Route>

        <Route path="/editpost">
          {isAuthenticated&&(role=='admin' || role=='author')&&(<EditPost/>)}
          {isAuthenticated&&(role!='admin' && role!='author')&&(<Message/>)} 
        </Route>
      </Switch>
    </div>
  );
}

export default App;
