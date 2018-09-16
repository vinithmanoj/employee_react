import React, { Component } from 'react';
import logo from './logo.svg';
import cape from './cape.png';
import './App.css';
import {Button} from 'reactstrap';
import Home from './Home.js';


class App extends Component {
  render() {    
    return (
      <div className="App">
        <header className="App-header">
          <img src={cape} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Cape Start</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Home/>        
      </div>
    );
  }
}

export default App;
