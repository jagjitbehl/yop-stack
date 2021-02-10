import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Stake from './pages/Stake';
import './App.scss';
import pTopImg from './assets/images/dot-bg-white-upper-left.png';
import StakeToken from './pages/StakeToken';
import StakeTokenProcessing from './pages/StakeTokenProcessing';
import StakeTokenPending from './pages/StakeTokenPending';
import StakeBar from './pages/StakeBar';
import StakeBarActive from './pages/StakeBarActive';
import StakeBarResult from './pages/StakeBarResult';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="mainWrap">
        <Header />
        <img className="pTopImg" src={pTopImg} alt="Top Image" />
        <img className="pBottImg" src={pTopImg} alt="Bottom Image" />
        <Router>
          <Route exact path="/">
            <Stake />
          </Route>
          <Route exact path="/token">
            <StakeToken />
          </Route>
          <Route exact path="/process">
            <StakeTokenProcessing />
          </Route>
          <Route exact path="/processpending">
            <StakeTokenPending />
          </Route>
          <Route exact path="/processbar">
            <StakeBar />
          </Route>
          <Route exact path="/processbaractive">
            <StakeBarActive />
          </Route>
          <Route exact path="/processresult">
            <StakeBarResult />
          </Route>
        </Router>
      </div>
    )
  }
}


export default App;