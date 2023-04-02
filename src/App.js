import { Switch,Route } from 'react-router-dom';
import './App.css';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Signup from './components/SignUp';

function App() {
  return (
    <div>
      {/* <CreatePost/> */}
      {/* <Login/> */}
      <NavBar/>
      <Switch>
      <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
        <Signup/>
        </Route>

      </Switch>
      
    </div>
  );
}

export default App;
