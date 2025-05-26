import React, { Component } from 'react';
import './Home.css'; // Make sure to update this file as shown below

class Home extends Component {
  state = {
    isLoggedIn: false,
    username: ''
  };

  componentDidMount() {
    const idToken = localStorage.getItem('idToken');
    const username = localStorage.getItem('username');

    if (idToken && username) {
      this.setState({ isLoggedIn: true, username });
    }
  }

  render() {
    const { isLoggedIn, username } = this.state;

    return (
      
      <div style={{
        backgroundImage: "url('/girl.jpg')",
        // backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
      }}className="home-background d-flex align-items-center justify-content-center  ">
        
        
        
        <div className="content-b">
          <h1 className="display-4 fw-bold this">Synesthesiya  </h1>

          {isLoggedIn && (
            <marquee>
              <h4 >Welcome Back <strong>{username}</strong>!</h4>
            </marquee>
            
          )}

          <p className=" info lead mb-3 mt-3">
            Experience storytelling like never before – powered by AI, creativity, and your imagination.
          </p>

          {isLoggedIn ? (
            <>
              <div className="ba">
                <a href="/dream-lab" className="btn bd bl ">DreamLab</a>
                <a href="/logout" className="btn btl btn-danger btn-lg">Logout</a>
              </div>
            </>
          ) : (
            <>
              <div className="ba">
                <a href="/login" className="btn  bl btn-lg ">Login</a>
                <a href="/signup" className="btn bs btn-lg">Signup</a>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
