import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Meeting from './components/Meeting'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Meeting />
      </div>
    );
  }
}

export default App;
