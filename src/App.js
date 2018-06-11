import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatWindow from './components/ChatWindow';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChatWindow />
      </div>
    );
  }
}

export default App;
