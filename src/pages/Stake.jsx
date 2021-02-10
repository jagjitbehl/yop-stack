import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Container, Row, Col, Button, Input,
} from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import BigNumber from 'bignumber.js'

import config from '../config';
import { useHistory } from "react-router-dom";
import { web3 } from '../yop/web3';
import { yopTokenContract, stakingContract } from '../yop/contracts';
import { getETHBalance, sendTransaction, formatDecimal, getHashLink } from '../yop/utils';
import { setAddress, setNetworkId, setConnectType, setError } from "../redux/actions";

import Icon1 from '../assets/images/1.jpg';
import Icon2 from '../assets/images/2.jpg';
import Icon3 from '../assets/images/3.jpg';
import Icon4 from '../assets/images/4.jpg';
import Icon5 from '../assets/images/5.jpg';
import pLogo from '../assets/images/pLogo.png';
import ypGraph from '../assets/images/ypGraph.jpg';
import inpuIcon from '../assets/images/purpleCircle.png';

function Stake() {
  const dispatch = useDispatch();
  const history = useHistory();
  const address = useSelector(state => state.authUser.address);
  const networkId = useSelector(state => state.authUser.networkId);

  const [yopBalance, setYopBalance] = useState(new BigNumber(0));
  const [stakeAmount, setStakeAmount] = useState(new BigNumber(0));
  const [isApproved, setIsApproved] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [dayOption, setDayOption] = useState(1);

  useEffect(() => {
    async function getStatus() {
      try {
        const balance = new BigNumber(await yopTokenContract.contract.methods.balanceOf(address).call());
        if (!balance.eq(yopBalance)) {
          setYopBalance(balance);
        }

        const allow = new BigNumber(await yopTokenContract.contract.methods.allowance(address, stakingContract.address).call());
        if (allow.isGreaterThan(0)) {
          setIsApproved(true);
          setStakeAmount(allow.div(1e8));
        }
      } catch (error) {
      }
    }
    if (address) {
      getStatus();
    }
  }, [address, networkId]);

  const onMetamaskConnect = async () => {
    if (typeof window.ethereum === 'undefined') {
      NotificationManager.warning('Please install MetaMask!');
      return;
    }
    try {
      const netId = `${await web3.eth.net.getId()}`;
      if (netId !== config.networkId) {
        if (config.networkId === '1')
          NotificationManager.warning('Please select main net to proceed!');
        else if (config.networkId === '3')
          NotificationManager.warning('Please select ropsten net to proceed!');
        return;
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts[0]) {
        dispatch(setNetworkId(netId));
        dispatch(setAddress(accounts[0]));
        dispatch(setConnectType('metamask'));
        history.push('/token');
      }
    } catch (error) {
      NotificationManager.warning('Something went wrong while connect wallet');
    }
    // setModalShow(false);
  };

  const onMaxButtonClicked = () => {
    setStakeAmount(yopBalance.div(1e8).toString(10));
  }

  const onApproveAndStake = async () => {
    if (isApproved) {
      stakingContract.contract.methods
        .stakeYOP(dayOption)
        .send({ from: address })
        .on('transactionHash', (hash) => {
          console.log(hash);
          setTxHash(hash);
        })
        .on('receipt', (result) => {
          console.log(result);
          setTxHash(null);
        })
        .on('error', (error) => {
          console.log(error);
          setTxHash(null);
        });
    } else {
      if (!stakeAmount || stakeAmount < 88.0) {
        NotificationManager.warning('Minium amount is 88 YOP');
        return;
      }
      const approveAmount = new BigNumber(stakeAmount).times(1e8);
      if (approveAmount.isGreaterThan(yopBalance)) {
        NotificationManager.warning('Amount exceeded your yop balance');
        return;
      }
      yopTokenContract.contract.methods
        .approve(stakingContract.address, approveAmount)
        .send({ from: address })
        .on('transactionHash', (hash) => {
          console.log(hash);
          setTxHash(hash);
        })
        .on('receipt', (result) => {
          console.log(result);
          setIsApproved(true);
          setTxHash(null);
        })
        .on('error', (error) => {
          console.log(error);
          setTxHash(null);
        });
    }
  }

  if (!address || networkId !== config.networkId) {
    return (
      <section className="innerSec stakeSec pt-md-0 pt-5">
        <Container>
          <Row>
            <Col md="6" xs="12">
              <div className="innerContent">
                <div className="ypHead mb-5">
                  <h2 className="text-primary">Staking Now Live!</h2>
                  <p>Some pretty words here?</p>
                </div>
                <div className="btnWrap mb-md-0 mb-4">
                  <span className="ypTags ypTags--outline-primary">Yop/Eth</span><br />
                  {/* <Link to="/token" className="btn btn-primary">Unlock Wallet</Link> */}
                  <button className="btn btn-primary" onClick={e => onMetamaskConnect()}>Unlock Wallet</button>
                </div>
              </div>
            </Col>
            <Col md="6" xs="12">
              <div className="gBox gBox--width gBox--padding">
                <div className="gBox__head text-center pb-4">
                  <h2 className="">Coming Soon</h2>
                  <p>Other Multi Asset and Liquidity Pool Staking</p>
                </div>
                <Row>
                  <Col md="6" xs="6" className="text-md-right text-center pb-4">
                    <span className="ypTags">YOP / SUSHI</span>
                  </Col>
                  <Col md="6" xs="6" className="text-md-left text-center pb-4">
                    <span className="ypTags">YOP / ETH LP</span>
                  </Col>
                  <Col md="6" xs="6" className="text-md-right text-center pb-md-0 pb-4">
                    <span className="ypTags">YOP / COMP</span>
                  </Col>
                  <Col md="6" xs="6" className="text-md-left text-center pb-0">
                    <span className="ypTags">YOP / USDC LP</span>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }

  return (
    <section className="innerSec stakeSec pt-md-0 pt-5">
      <Container>
        <Row className="align-items-stretch">
          <Col md="9" xs="12">
            <div className="ypBox">
              <div className="ypBox__head ypBox__head--border text-center">
                <div className="ypHeadLeft" />
                <div className="ypHeading">
                  <h3><img className="ypdIcon" src={Icon5} /> Stake Token</h3>
                </div>
                <div className="ypHeadRight">
                  <span className="text-muted label-medium">Available $YOP Balance <span className="pl-1 text-secondary">{formatDecimal(yopBalance, 8)}</span></span>
                </div>
              </div>
              <div className="ypBox__content">
                <div className="ypBox__block">
                  <Row>
                    <Col md="8" xs="12">
                      <div className="ypLeft"><img className="ypdIcon" src={Icon1} /> Stake Amount</div>
                    </Col>
                    <Col md="4" xs="12">
                      <div className="ypRight ypRight--icon d-flex align-items-center">
                        <div className="inputIcon">
                          <img src={inpuIcon} alt="" />
                          <Input type="number" value={stakeAmount} onChange={e => { setStakeAmount(e.target.value) }} disabled={isApproved} />
                        </div>
                        <span className="text-primary label-medium font-weight-bold pl-3" onClick={e => onMaxButtonClicked()}>MAX</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ypBox__block">
                  <Row>
                    <Col md="8" xs="12">
                      <div className="ypLeft"><img className="ypdIcon" src={Icon2} /> Stake Period <span className="small">(Days)</span></div>
                    </Col>
                    <Col md="4" xs="12">
                      <div className="ypRight text-right">
                        <span className={dayOption === 1 ? 'cValue cValue-primary' : 'cValue cValue-light'} onClick={e => setDayOption(1)}>30</span>
                        <span className={dayOption === 2 ? 'cValue cValue-primary' : 'cValue cValue-light'} onClick={e => setDayOption(2)}>60</span>
                        <span className={dayOption === 3 ? 'cValue cValue-primary' : 'cValue cValue-light'} onClick={e => setDayOption(3)}>90</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ypBox__block">
                  <Row>
                    <Col md="8" xs="12">
                      <div className="ypLeft"><img className="ypdIcon" src={Icon3} /> Reward <span className="small">(Potential earning at the end of stake period)</span></div>
                    </Col>
                    <Col md="4" xs="12">
                      <div className="ypRight text-right">
                        <h5><span className="small text-primary font-weight-bold">$YOP</span><span className="pl-3 font-weight-normal">0</span></h5>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ypBox__block">
                  <Row>
                    <Col md="8" xs="12">
                      <div className="ypLeft d-flex">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            <span className="small">Only 1 stake is possible per wallet. Staked Tokens will be locked for the full duration of the stake period. Unstaking will not be possible.</span>
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col md="4" xs="12">
                      <div className="ypRight text-right">
                        <h5><span className="pr-1 font-weight-normal small">View Contract on Etherscan</span>
                          <img className="pLogo ypdIcon" src={pLogo} alt="ypdIcon" /></h5>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ypBox__bottom text-center">
                  {/* <a href="/process" className="btn btn-primary btn-mw300">STAKE</a> */}
                  <button className="btn btn-primary btn-mw300" onClick={e => onApproveAndStake()}>
                    {
                      isApproved ? 'STAKE' : 'Approve'
                    }
                  </button>
                </div>
              </div>

              {txHash ?
                <div className="ypBox--active d-flex justyfy-content-center align-items-center flex-wrap flex-column">
                  <div className="ypInnner flex-row">
                    <img className="mb-4" src={Icon5} />
                    <h4 className="text-white font-weight-normal"><strong>{stakeAmount}</strong> $YOP<br />Staking in Progress</h4>
                  </div>
                  <a href={`${getHashLink(networkId, txHash)}`} className="pb-5 text-white text-underline"><u>View Transaction on Etherscan</u></a>
                </div> : ''}
            </div>
          </Col>
          <Col md="3" xs="12">
            <div className="ypBox ypBox--rBlock text-center h-md-100">
              <div className="ypBox__block ypBox__block--border">
                <div className="yBoxSmall">
                  <h5>Total Reward</h5>
                  <p>1,000,000</p>
                </div>
              </div>
              <div className="ypBox__block ypBox__block--border">
                <div className="yBoxSmall">
                  <h5>Reward Remaining</h5>
                  <p>967,240.234</p>
                </div>
              </div>
              <div className="ypBox__block">
                <div className="yBoxSmall">
                  <h5>TVL</h5>
                  <p>2,002,469.673</p>
                </div>
              </div>
              <div className="ypBox__blockmb-0">
                <div className="graph">
                  <img src={ypGraph} alt="" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Stake;
