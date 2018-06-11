import React, { Component } from 'react';
import '../App.css';
import openSocket from 'socket.io-client';
import Login from './Login';

const socket = openSocket('http://localhost:5000');

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messageToSend: '',
      username: '',
      activeUsers: [],
      loggedIn: false
    };
    this.receiveActiveUsers();
    this.receiveMessage();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logIn = this.logIn.bind(this);
    this.exitChat = this.exitChat.bind(this);
  }

  render () {
    const { messageToSend, loggedIn } = this.state;
    return loggedIn ? (
      <div className="app-container">
        <div className="chat-container">
          <div className="chat-window">{this.renderMessages()}</div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="typedMessage" value={messageToSend} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="sidebar">
          <div className="active-users">{this.renderActiveUsers()}</div>
          <button onClick={this.exitChat}>Exit Conversation</button>
        </div>
      </div>
    ) : (<Login logIn={this.logIn} />)
  }

  renderMessages() {
    const { messages } = this.state;
    return messages.map((message, index) => {
        return (<span key={index} className="chat-message"><span>{message.author}:</span> <span>{message.message}</span></span>)
      })
  }

  renderActiveUsers() {
    const { activeUsers } = this.state;
    return activeUsers.map((user, index) => {
        return (<span key={index}>{user}</span>)
      })
  }

  handleChange(event) {
    this.setState({messageToSend: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let messageToSend = {
      author: this.state.username,
      users: this.state.activeUsers,
      text: data.get("typedMessage")
    }
    this.sendMessage(messageToSend);
  }

  logIn(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let username = data.get("username");
    socket.emit('activeUser', username);
    socket.emit('subscribeToMessages', {user: username, interval: 100});
    this.setState({
      loggedIn: true,
      username: username
    })
  }

  sendMessage(message) {
    this.setState({
      messageToSend: '',
      messages: this.state.messages.concat([message])
    });
    socket.emit('sendMessage', message);
  }

  receiveMessage() {
    socket.on('receiveMessages', messages => {
      this.setState({
        messages: messages
      });
    });
  }

  receiveActiveUsers() {
    socket.on('activeUsers', users => {
      this.setState({
        activeUsers: users.map(user => user.user)
      })
    })
  }

  exitChat() {
    const { username } = this.state;
    socket.emit('close', username);
    socket.close();
    this.setState({
      loggedIn: false
    })
  }
}

export default ChatWindow;
