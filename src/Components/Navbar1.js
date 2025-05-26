import React from "react";
import { Link } from "react-router-dom";
class Navbar extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src="/logo.jpg" width="30" height="24"/>
              SYNESTHESIYA
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              {/* Left-aligned links */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Dream Lab
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
              </ul>

              {/* Right-aligned links */}
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span className="bi bi-person"></span> Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span className="bi bi-box-arrow-in-right"></span> Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span className="bi bi-box-arrow-right"></span> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <h3>Right Aligned Navbar</h3>
          <p>The .ms-auto class is used to push items to the right in Bootstrap 5.</p>
        </div>
      </>
    );
  }
}

export default Navbar;
