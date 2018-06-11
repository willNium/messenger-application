import React, { Component } from 'react';
import '../App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      logIn: this.props.logIn
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { username, logIn } = this.state;
    return (
      <div className="login-container">
        <form onSubmit={logIn}>
          <label>Username<input type="text" name="username" value={username}
            onChange={this.handleChange} /></label>
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let username = data.get("username");
    this.setState({username})
  }
}

export default Login;
