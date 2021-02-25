import React, { useState } from 'react';
import {
  Container, Row, Col, Button, Input
} from 'reactstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory, useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon1 from '../assets/Icons/stake-amount.svg';
import Icon3 from '../assets/Icons/reward.svg';
import Icon5 from '../assets/Icons/stake-token.svg';
import IconLock from '../assets/images/lockIcon.png';
import pLogo from '../assets/images/pLogo.png';
import ypGraph from '../assets/images/ypGraph.jpg';
import useStakerInfo from '../hooks/useStakerInfo';
import useContractInfos from '../hooks/useContractInfos';
import { formatDecimal, getHashLink, getRoundFigure, formatDate} from '../yop/utils';
import { RightSidebar } from './RightSidebar';
import { UnicornBanner } from './UnicornBanner';
import StakeVideo from './StakeVideo';

function StakeBarResult(props) {
  const history = useHistory();
  const address = useSelector(state => state.authUser.address);
  const networkId = useSelector(state => state.authUser.networkId);

  const stakerInfo = useStakerInfo(address);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // TODO use me to show staking information
  const stakerInfos = useStakerInfo(address);
  // TODO use me to show contract information on the side
  const contractInfos = useContractInfos();
  const [showVideo, setVideo] = useState(false);

  const {
    rewardsOwed,
    rewardPool,
    tvl,
  } = contractInfos;

  const {
    amount,
    reward,
    startOfStake,
    endOfStake,
    startOfStakeMillis,
    endOfStakeMillis,
  } = stakerInfos;

  const rewardsRemaining = rewardsOwed && rewardPool ? (rewardPool - rewardsOwed) : 0;
  const txHash = location.state && location.state.txHash ? location.state.txHash : null;

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

  return(
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
                  <h3><img className="ypdIcon" src={Icon5} />Staking</h3>
                </div>
                <div className="ypHeadRight">
                  <span className="text-muted label-medium">Available $YOP Balance <span className="pl-1 text-secondary">750,000.00</span></span>
                </div>
              </div>
              <div className="ypBox__content">
                <div className="ypBox__block">
                  <Row>
                    <Col md="6" xs="12">
                      <div className="ypLeft d-flex align-items-center">
                        <img className="ypdIcon mr-2" src={Icon1} /> <span className="label-medium font-weight-medium">Stake Amount</span>
                        <span className="label-medium font-weight-medium text-primary pl-3">1,234.12345678 </span>
                        <span className="label-medium font-weight-medium text-primary pl-3">$YOP</span>
                      </div>
                    </Col>
                    <Col md="6" xs="12">
                      <div className="ypRight ypRight--icon d-flex align-items-center justify-content-md-end">
                        <img className="ypdIcon" src={Icon3} /> 
                        <span className="label-medium font-weight-medium pl-1">Rewards Earned (YTD)</span>
                        <span className="label-medium font-weight-medium text-success mb-0 pl-3">+0.0235 $YOP</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ypBox__block">
                  <div className="progressWrap my-5">
                    <span className="posLtop" style={{ left: '4%'}}><span className="text-success label-medium">+0.0235 $YOP</span><span className="d-block label-small font-weight-medium">4th February 2021</span></span>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style={{ width: '5%'}}></div>
                    </div>
                    <span className="posLbott"><span className="d-block label-small font-weight-medium">4th February 2021</span><span className="d-block text-primary font-weight-medium">1st February 2021</span></span>
                    <span className="posRbott text-right"><span className="d-block label-small font-weight-medium">4th February 2021</span><span className="d-block text-primary  font-weight-medium">1st March 2021</span></span>
                  </div>
                </div>
                <div className="ypBox__bottom text-center">
                  <a href="/processbaractive" className="btn btn-primary btn-mw300">UNSTAKE & CLAIM REWARD</a>
                </div>
              </div>
              <div className="ypBox--active d-flex justyfy-content-center align-items-center flex-wrap flex-column">
                <div className="ypInnner flex-row">
                  <img className="mb-5" src={IconLock} />
                  <h4 className="text-white font-weight-normal mb-4"><span><strong>{getRoundFigure(formatDecimal(amount, 8))}</strong> $YOP Unstaked</span><span className="px-4">|</span><span><strong>{getRoundFigure(formatDecimal(reward, 8))}</strong> $YOP Earned</span></h4>
                  <span className="text-white font-weight-normal label-sub"><span><strong>Staked On: </strong><span dangerouslySetInnerHTML={{ __html: formatDate(startOfStake) }} /></span><span className="px-4">|</span><span><strong>Claim Reward On: </strong><span dangerouslySetInnerHTML={{ __html: formatDate(endOfStake) }} /></span></span>
                </div>
                {txHash &&
                <a href={`${getHashLink(networkId, txHash)}`} className="pb-5 text-white text-underline" rel="noreferrer" target="_blank"><u>View Transaction on Etherscan</u></a>
                }
              </div>
            </div>
          </Col>
          <RightSidebar 
            stakerInfos={stakerInfo}
            contractInfos={contractInfos}
            networkId={networkId}
            className="stake-result"
          />
        </Row>          
      </Container>
    </section>
  )
}

export default StakeBarResult;
