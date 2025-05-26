// src/Components/Logout.js
import React, { Component } from 'react';

class Logout extends Component {
  componentDidMount() {
    // Clear user session from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("idToken");
    localStorage.removeItem("localId");
    window.dispatchEvent(new Event("storage"));

    // Simulate a short delay before redirect
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.spinner}></div>
        <p style={styles.text}>Logging you out...</p>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: '100vh',
    backgroundColor: '#121212', // dark background
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '6px solid #444',
    borderTop: '6px solid #00bfff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  text: {
    marginTop: '20px',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '500',
  },
};

// Inject keyframes for spinner animation
const styleSheet = document.styleSheets[0];
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Logout;
