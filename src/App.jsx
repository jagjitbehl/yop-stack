import React, { Component } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import './App.scss';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="mainWrap">
        <Header />
        <Content />
      </div>
    )
  }
}


export default App;