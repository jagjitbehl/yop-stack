import React, { Component } from 'react';
import Header from './components/Header';
import Stake from './pages/Stake';
import './App.scss';
import pTopImg from './assets/images/dot-bg-white-upper-left.png';
import pBottImg from './assets/images/dota-bg-white-lower-right.png';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="mainWrap">
        <Header />
        <Stake />
        <img className="pTopImg" src={pTopImg} alt="Top Image" />
        <img className="pBottImg" src={pBottImg} alt="Bottom Image" />
      </div>
    )
  }
}


export default App;