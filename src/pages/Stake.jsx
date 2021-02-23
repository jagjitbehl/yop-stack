import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Row, Col, Input,
} from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import BigNumber from 'bignumber.js'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import config from '../config';
import { useHistory, useLocation } from "react-router-dom";
import { web3 } from '../yop/web3';
import { yopTokenContract, stakingContract } from '../yop/contracts';
import { formatDecimal, getHashLink, getContractLink, getRoundFigure } from '../yop/utils';
import { setAddress, setNetworkId, setConnectType } from "../redux/actions";
import { contractAddresses } from '../yop/constants';
import transparentLoader from '../assets/images/yop-loader-white.gif';
import Icon1 from '../assets/images/1.jpg';
import Icon2 from '../assets/images/2.jpg';
import Icon3 from '../assets/images/3.jpg';
import Icon5 from '../assets/images/5.jpg';
import pLogo from '../assets/images/pLogo.png';
import Icon5White from '../assets/images/5-white.png';
import inpuIcon from '../assets/images/purpleCircle.png';
import ypGraph from '../assets/images/ypGraph.jpg';
import useContractInfos from '../hooks/useContractInfos'
import useStakerInfo from '../hooks/useStakerInfo'
import StakeBarActive from './StakeBarActive';
import loader from '../assets/images/loader.gif';
import StakeBarResult from './StakeBarResult';
import { RightSidebar } from './RightSidebar';
import { StakeHomeScreen } from './StakeHomeScreen';
import { UnlockWallet } from './UnlockWallet';
import { UnicornBanner } from './UnicornBanner';
import StakeVideo from './StakeVideo';

function Stake() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  console.log('location', location);
  const address = useSelector(state => state.authUser.address);
  const networkId = useSelector(state => state.authUser.networkId);

  // TODO use me
  const stakerInfo = useStakerInfo(address)


  const [yopBalance, setYopBalance] = useState(new BigNumber(0));
  const [stakeAmount, setStakeAmount] = useState(new BigNumber(0));
  const [approvalCheck, setApprovalCheck] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [stakeResultHash, setStakeResultHash] = useState(null);
  const [dayOption, setDayOption] = useState(1);
  const [loading, setLoading] = useState(true);
  const [rewardYop, setRewardYop] = useState(0);
  const [showVideo, setVideo] = useState(false);

  // TODO use me to show staking information
  const stakerInfos = useStakerInfo(address);
  // TODO use me to show contract information on the side
  const contractInfos = useContractInfos();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false) 
    }, 1000);
  }, []);

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
        console.log(error);
      }
    }

    if (address) {
      getStatus();
    }

  }, [address, networkId]);

  useEffect(() => {
    const rewardPercentage = (dayOption === 1 ?  6 : (dayOption === 2 ? 15 : 33));
    const value = ((stakeAmount * rewardPercentage) / 100);
    setRewardYop(value);
  }, [stakeAmount, dayOption]);

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
        // history.push('/token');
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
          setTxHash(hash);
        })
        .on('receipt', (result) => {
          console.log('result', result);
          setTxHash(null);
          history.push('/processbaractive');
        })
        .on('error', (error) => {
          console.log('error', error);
          setTxHash(null);
        });
    } else {
      if (!stakeAmount || stakeAmount <= 0) {
        NotificationManager.warning('Please enter amount to stake');
        return;
      }
      const approveAmount = new BigNumber(stakeAmount).times(1e8);
      if (approveAmount.isGreaterThan(yopBalance)) {
        NotificationManager.warning('Amount exceeded your yop balance');
        return;
      }
      
      yopTokenContract.contract.methods
        .approve(stakingContract.address, approveAmount.toString())
        .send({ from: address })
        .on('transactionHash', (hash) => {
          console.log(hash);
          setTxHash(hash);
        })
        .on('receipt', (result) => {
          console.log(result);
          setIsApproved(true);
          setApprovalCheck(false)
          setTxHash(null);
        })
        .on('error', (error) => {
          console.log(error);
          setTxHash(null);
        });
    }
  }

  const handleCheckbox = () => {
    setApprovalCheck(!approvalCheck);
  }

  const handleStakeResult = (hash) => {
    setStakeResultHash(hash)
  }

  const {
    rewardTaken,
    hasStaked,
  } = stakerInfos;

  if (loading) {
    return (
      <div  className="siteLoader">
        <img src={transparentLoader} alt="loading..." />
      </div>
    )
  }

  if (!address || networkId !== config.networkId) {
    return (
      <StakeHomeScreen 
        onMetamaskConnect={onMetamaskConnect}
      />
    )
  }

  const handleBanner = (value) => {
    setVideo(value);
  }

  if (showVideo === true) {
    return (
      <StakeVideo 
        handleBanner={handleBanner}
      />
    )
  }

  // if (location.pathname !== '/stake' && isApproved === false && stakerInfos.hasStaked === false) {
  //   return (
  //     <StakeHomeScreen />
  //   )
  // }

  if (stakerInfos.hasStaked && stakerInfos.hasStaked === true && rewardTaken == false) {
    return (
      <StakeBarActive
        stakerInfos={stakerInfo}
        contractInfos={contractInfos}
        handleStakeResult={handleStakeResult}
        networkId={networkId}
      />
    );
  }

  if (rewardTaken === true) {
    return (
      <StakeBarResult 
        stakerInfos={stakerInfo}
        contractInfos={contractInfos}
        stakeResultHash={stakeResultHash}
        networkId={networkId}
      />
    );
  }

  return (
    <section className="innerSec stakeSec pt-md-0 pt-5">
      <Container>
        <Row className="align-items-stretch">
          <UnicornBanner 
            handleBanner={handleBanner}
          />
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
                          <Input type="number" value={stakeAmount} onChange={(e) => { setStakeAmount(e.target.value) }} disabled={isApproved} />
                        </div>
                        <span className="text-primary label-medium font-weight-bold pl-3 cursor-pointer" onClick={() => onMaxButtonClicked()}>MAX</span>
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
                        <span className={dayOption === 1 ? 'cValue cValue-primary' : 'cValue cValue-light'} onClick={() => setDayOption(1)}>30</span>
                        <span className={dayOption === 2 ? 'cValue cValue-primary' : 'cValue cValue-light'} onClick={() => setDayOption(2)}>60</span>
                        <span className={dayOption === 3 ? 'cValue cValue-primary' : 'cValue cValue-light'} onClick={() => setDayOption(3)}>90</span>
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
                        <h5><span className="small text-primary font-weight-bold">$YOP</span><span className="pl-3 font-weight-normal">{rewardYop}</span></h5>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ypBox__block">
                  <Row>
                    <Col md="8" xs="12">
                      <div className="ypLeft d-flex">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value={approvalCheck} onChange={handleCheckbox} id="flexCheckDefault" />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            <span className="small">Only 1 stake is possible per wallet. Staked Tokens will be locked for the full duration of the stake period. Unstaking will not be possible.</span>
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col md="4" xs="12">
                      <div className="ypRight text-right">
                        <h5><a href={`${getContractLink(networkId, contractAddresses['staking'][networkId])}`} rel="noreferrer" target="_blank" style={{ color: 'black', textDecoration: 'none'}} className="pr-1 font-weight-normal small">View Contract on Etherscan</a>
                          <img className="pLogo ypdIcon" src={pLogo} alt="ypdIcon" /></h5>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ypBox__bottom text-center">
                <div className="ypBox__bottom text-center">
                  {/* <a href="/process" className="btn btn-primary btn-mw300">STAKE</a> */}
                  <button className="btn btn-primary btn-mw300 approve" disabled={!approvalCheck || isApproved} onClick={() => onApproveAndStake()}>
                    Approve
                  </button>
                  <span className="div"/>
                  <button className="btn btn-primary btn-mw300 approve" disabled={!approvalCheck || !isApproved} onClick={() => onApproveAndStake()}>
                    Stake
                  </button>
                </div>
                </div>
              </div>
              {txHash ?
                <div className="ypBox--active d-flex justyfy-content-center align-items-center flex-wrap flex-column">
                  <div className="ypInnner flex-row">
                    <h5 className="text-white font-weight-normal mb-5">{`${isApproved ? 'Stake' : 'Approve'} transaction pending...`}</h5>
                    <img src={transparentLoader} className="transactionLoader" alt="loading..." />
                  </div>
                  <a href={`${getHashLink(networkId, txHash)}`} className="pb-5 text-white text-underline" rel="noreferrer" target="_blank"><u>View Transaction on Etherscan</u></a>
                </div> : ''}
            </div>
          </Col>
          <RightSidebar 
            stakerInfos={stakerInfo}
            contractInfos={contractInfos}
            networkId={networkId}
          />
        </Row>
      </Container>
    </section>
  )
}

export default Stake;