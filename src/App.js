import { Switch,Route } from 'react-router-dom';
import './App.css';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Signup from './components/SignUp';

function App() {
  return (
    <div>
      {/* <CreatePost/> */}
      {/* <Login/> */}
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
