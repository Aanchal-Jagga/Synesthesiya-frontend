import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark " >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/logo.png"  height="45" width="45" className="me-2" />
            SYNESTHESIYA
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dream-lab">Dream Lab</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dream-scenes">Dream Scenes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/echoes">Echoes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/signup"><span className="bi bi-person"></span> Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login"><span className="bi bi-box-arrow-in-right"></span> Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout"><span className="bi bi-box-arrow-right"></span> Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
