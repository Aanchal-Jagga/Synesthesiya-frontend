import React, { Component } from 'react';
import axios from 'axios';
// import './signup.css'; // Reuse signup styles for consistency

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    success: '',
    isLoggedIn: false,
    username: '',
  };

  componentDidMount() {
    const idToken = localStorage.getItem('idToken');
    const username = localStorage.getItem('username');

    if (idToken && username) {
      this.setState({ isLoggedIn: true, username });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '', success: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await axios.post('https://9093-49-36-191-40.ngrok-free.app/login', {
        email,
        password,
      });

      localStorage.setItem('idToken', response.data.idToken);
      localStorage.setItem('localId', response.data.localId);
      localStorage.setItem('username', response.data.username);

      this.setState({
        success: 'Login successful!',
        isLoggedIn: true,
        username: response.data.username,
      });

      window.location.href = '/';
    } catch (error) {
      this.setState({ error: error.response?.data?.detail || 'Login failed' });
    }
  };

  handleLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem('username');
    this.setState({ isLoggedIn: false, email: '', password: '', username: '' });
    window.location.reload();
  };

  render() {
    const { email, password, error, success, isLoggedIn, username } = this.state;

    return (
      <div
        style={{
          backgroundImage: "url('/entry.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        className="signup-background"
      >
        <div className="signup-overlay">
          <div className="signup-form-container">
            {isLoggedIn ? (
              <div className="text-c">
                <p className="s-text">
                  You're logged in as <br />
                  <strong>{username}</strong>
                </p>
                <button className=" btn-p w-100" onClick={this.handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <form onSubmit={this.handleSubmit} className="signup-form">
                <h2 className="signup-title">Login</h2>

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

                <button type="submit" className="signup-button">
                  Login
                </button>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <div className="signup-footer">
                  <p>Don't have an account? <a href="/signup">Sign up now</a>.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
