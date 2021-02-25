import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { setAddress, setNetworkId, setConnectType, setError } from "./redux/actions";
import Header from './components/Header';
import Stake from './pages/Stake';
import './App.scss';
import pTopImg from './assets/images/dot-bg-white-upper-left.png';
import backgroundImage from './assets/images/background-dots.gif';
import StakeToken from './pages/StakeToken';
import StakeTokenProcessing from './pages/StakeTokenProcessing';
import StakeTokenPending from './pages/StakeTokenPending';
import StakeBar from './pages/StakeBar';
import StakeBarActive from './pages/StakeBarActive';
import StakeBarResult from './pages/StakeBarResult';
import StakeHomeScreen from './pages/StakeHomeScreen';
import StakeVideo from './pages/StakeVideo';

import { providerUrl, Web3, connector } from "./yop/web3";

const backGroundStyle = {
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${backgroundImage})`,
  backGroundSize: "100%",
  backGroundPosition: "center center",
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    if (connector.connected) {
      this.props.setAddressRequest(connector._accounts[0]);
      this.props.setNetworkIdRequest(connector._chainId.toString(10));
      this.props.setConnectTypeRequest('walletConnect');
    } else {
      window.web3 = null;
      // modern broswers
      if (typeof window.ethereum !== "undefined") {
        window.web3 = new Web3(window.ethereum);
        window.web3.eth.net.getId((err, netId) => {

          this.handleNetworkChanged(`${netId}`);
          window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
            if (accounts[0]) {
              this.props.setAddressRequest(accounts[0]);
            }
          });
          window.ethereum.on("accountsChanged", (accounts) =>
            this.handleAddressChanged(accounts)
          );
          window.ethereum.on("networkChanged", (networkId) =>
            this.handleNetworkChanged(networkId)
          );
          this.props.setConnectTypeRequest('metamask');
        });
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.web3 = null;
      }
    }
  }

  handleAddressChanged = (accounts) => {
    if (typeof window.ethereum !== "undefined") {
      // window.location.reload(false);
      if (accounts[0]) {
        this.props.setAddressRequest(accounts[0]);
      } else {
        this.props.setAddressRequest(null);
        this.props.setNetworkIdRequest(null);
        this.props.setConnectTypeRequest('');
      }
    }
  };

  handleNetworkChanged = (networkId) => {
    this.props.setNetworkIdRequest(networkId);
    switch (networkId) {
      case "1":
        if (String(providerUrl).includes("mainnet")) {
          this.props.setErrorRequest(false);
        } else {
          this.props.setErrorRequest(true);
        }
        break;
      case "3":
        if (String(providerUrl).includes("ropsten")) {
          this.props.setErrorRequest(false);
        } else {
          this.props.setErrorRequest(true);
        }
        break;
      default:
        this.props.setErrorRequest(true);
    }
  };



  render() {
    return (
      <div className="mainWrap" style={backGroundStyle}>
        <Header />
        <Router>
          <Route exact path="/">
            <Stake />
          </Route>
          <Route exact path="/stake">
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
          <Route exact path="/stakevideo">
            <StakeVideo />
          </Route>
        </Router>
        <NotificationContainer />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAddressRequest: (address) => dispatch(setAddress(address)),
    setNetworkIdRequest: (networkId) => dispatch(setNetworkId(networkId)),
    setConnectTypeRequest: (connectType) => dispatch(setConnectType(connectType)),
    setErrorRequest: (error) => dispatch(setError(error)),
  };
};

export default connect(null, mapDispatchToProps)(App);
