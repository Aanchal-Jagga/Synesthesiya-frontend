import React, { Component } from 'react';
import axios from 'axios';
import './signup.css'; // You'll need to update this too

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: '',
    success: '',
    isLoading: false,
    isLoggedIn: false,
    loggedInUsername: ''
  };

  componentDidMount() {
    this.checkLoginStatus();
    window.addEventListener('storage', this.handleStorageChange);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
  }

  componentDidUpdate() {
    if (
      localStorage.getItem('username') !== this.state.loggedInUsername &&
      this.state.isLoggedIn
    ) {
      this.checkLoginStatus();
    }
  }

  handleStorageChange = () => {
    this.checkLoginStatus();
  };

  checkLoginStatus = () => {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ isLoggedIn: true, loggedInUsername: username });
    } else {
      this.setState({ isLoggedIn: false, loggedInUsername: '' });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '', success: '' });
  };

  handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');

    this.setState({
      isLoggedIn: false,
      loggedInUsername: '',
      username: '',
      email: '',
      password: ''
    });

    window.dispatchEvent(new Event('storage'));
  };

  // sendVerificationEmail = async (localId, idToken) => {
  //   try {
  //     const response = await axios.post(
  //       'https://9093-49-36-191-40.ngrok-free.app/send-verification',
  //       { user_id: localId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${idToken}`
  //         }
  //       }
  //     );

  //     console.log('✅ Verification email sent:', response.data);
  //     alert('Verification email sent! Check your inbox.');
  //   } catch (error) {
  //     console.error('❌ Failed to send verification email:', error);
  //     alert('Failed to send verification email. Try again.');
  //   }
  // };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await axios.post('https://9093-49-36-191-40.ngrok-free.app/signup', {
        username,
        email,
        password
      });

      const { idToken, localId } = response.data;

      localStorage.setItem('username', username);
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('localId', localId);

      // await this.sendVerificationEmail(localId, idToken);

      this.setState({
        success: `Verification email sent to ${email}. Please verify your email.`,
        isLoading: false,
        isLoggedIn: true,
        loggedInUsername: username
      });
    } catch (error) {
      this.setState({
        error: error.response?.data?.detail || 'Signup failed',
        isLoading: false
      });
    }
  };

  render() {
    const {
      username,
      email,
      password,
      error,
      success,
      isLoading,
      isLoggedIn,
      loggedInUsername
    } = this.state;

    return (
      <div style={{
        backgroundImage: "url('/entry.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        
      }}className="signup-background" >
        <div className="signup-overlay">
          <div className="signup-form-container">
            {isLoggedIn ? (
              <div className="text-c">
                <p className="s-text">
                  You're logged in as <br/>
                  <strong>{loggedInUsername}</strong>
                </p>
                <button className=" btn-p w-100" onClick={this.handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <form onSubmit={this.handleSubmit} className="signup-form" >
                <h2 className="signup-title " >Sign Up</h2>

                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="signup-input"
                  onChange={this.handleChange}
                  value={username}
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="signup-input"
                  onChange={this.handleChange}
                  value={email}
                  required
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="signup-input"
                  onChange={this.handleChange}
                  value={password}
                  required
                />

                <button type="submit" className="signup-button" disabled={isLoading}>
                  {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <div className="signup-footer">
                  <p>Already have an account? <a href="/login">Login now</a>.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
