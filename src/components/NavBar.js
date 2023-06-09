import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useSelector } from "react-redux";


const NavBar = () => {
    const dispatch = useDispatch();
    const logout=()=>{
        dispatch(authActions.logout());
        localStorage.removeItem("role");
    }
   const role = useSelector((state) => state.auth.role);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Blog Website</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!isAuthenticated&&(<li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>)}
            {!isAuthenticated&&(<li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>)}
            
            {isAuthenticated&&(role=='admin' || role=='author')&&(<li className="nav-item">
              <Link className="nav-link" to="/createpost">Create Post</Link>
            </li>)}

            {isAuthenticated&&(role=='admin' || role=='author')&&(<li className="nav-item">
              <Link className="nav-link" to="/editpost">Edit Post</Link>
            </li>)}
            {isAuthenticated&&(<li className="nav-item">
              <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
            </li>)}

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
