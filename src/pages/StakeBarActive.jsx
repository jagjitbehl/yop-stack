import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container, Row, Col,
} from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useHistory, useLocation } from "react-router-dom";
import { yopTokenContract, stakingContract } from '../yop/contracts';
import {
 formatDecimal,
 getRoundFigure,
 getHashLink,
 formatDate,
} from '../yop/utils';
import transparentLoader from '../assets/images/yop-loader-white.gif';
import useContractInfos from '../hooks/useContractInfos'
import useStakerInfo from '../hooks/useStakerInfo'
import Icon5White from '../assets/images/5-white.png';
import Icon1 from '../assets/Icons/stake-amount.svg';
import Icon3 from '../assets/Icons/reward.svg';
import Icon5 from '../assets/Icons/stake-token.svg';
import { RightSidebar } from './RightSidebar';
import { UnicornBanner } from './UnicornBanner';
import StakeVideo from './StakeVideo';


function StakeBarActive() {

  const history = useHistory();
  const address = useSelector(state => state.authUser.address);
  const networkId = useSelector(state => state.authUser.networkId);
  let progressValue = 0;
  const stakerInfo = useStakerInfo(address, progressValue);
  const [txHash, setTxHash] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressCompleted, setProgress] = useState(0);
  const [rewardsEarned, setRewardsEarned] = useState(0);
  const location = useLocation();
  const stakerInfos = useStakerInfo(address, progressValue);
  const contractInfos = useContractInfos();
  const [showVideo, setVideo] = useState(false);

  const {
    amount,
    reward,
    startOfStake,
    endOfStake,
    startOfStakeMillis,
    endOfStakeMillis,
  } = stakerInfos;

  const onClaim = async () => {
    stakingContract.contract.methods
      .claimRewards()
      .send({ from: address })
      .on('transactionHash', (hash) => {
        console.log('hash', hash);
        setTxHash(hash);
      })
      .on('receipt', (result) => {
        console.log('result', result);
        const { transactionHash } = result;
        history.push({
          pathname: '/processresult',
          state: { txHash: transactionHash },
        });
      }, () => {
        setTxHash(null);
      })
      .on('error', (error) => {
        console.log('error', error);
        NotificationManager.warning('Something went wrong while claiming. Please try again later');
        setTxHash(null);
      });
  }

  useEffect(() => {
    let dataReceived = false;
    if (stakerInfos.startOfStakeMillis && dataReceived === false) {
      dataReceived = true;
      const interval = setInterval(() => {
        progressValue = progressValue + 1;
        const newProgress = Math.floor(((Date.now() - startOfStakeMillis) / (endOfStakeMillis - startOfStakeMillis)) * 100);
        const showSlowProgress = newProgress - 15;
        const rewardsEarned = showSlowProgress <= 100 ? ((showSlowProgress * reward) / 100) : reward;
        setProgress(showSlowProgress);
        setRewardsEarned(rewardsEarned);
        if (Date.now() >= endOfStakeMillis && newProgress > 120) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, [stakerInfos]);

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

  if (loading) {
    return (
      <div  className="siteLoader">
        <img src={transparentLoader} alt="loading..." />
      </div>
    )
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
                  <h3><img className="ypdIcon" src={Icon5} /> Staking</h3>
                </div>
                <div className="ypHeadRight" />
              </div>
              <div className="ypBox__content">
                <div className="ypBox__block">
                  <Row>
                    <Col md="6" xs="12">
                      <div className="ypLeft d-flex align-items-center">
                        <img className="ypdIcon mr-2" src={Icon1} /> <span className="label-medium font-weight-medium">Stake Amount</span>
                        <span className="label-medium font-weight-medium text-primary pl-3">{getRoundFigure(formatDecimal(amount, 8))}</span>
                        <span className="label-medium font-weight-medium text-primary pl-3">$YOP</span>
                      </div>
                    </Col>
                    <Col md="6" xs="12">
                      <div className="ypRight ypRight--icon d-flex align-items-center justify-content-md-end">
                        <img className="ypdIcon" src={Icon3} />
                        <span className="label-medium font-weight-medium pl-1">Reward</span>
                        <span className="label-medium font-weight-medium text-success mb-0 pl-3">{`+${getRoundFigure(formatDecimal(reward, 8))}`} $YOP</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ypBox__block">
                  <div className="progressWrap my-5">
                    {progressCompleted < 80 ?
                      <span className="posLtop" style={{ left: `${progressCompleted <=0 ? 1 : (progressCompleted - 1)}%`}}>
                        <span className="text-success label-medium">{`+${formatDecimal(rewardsEarned, 8)} $YOP`}</span>
                        <span className="d-block label-small font-weight-medium"><span dangerouslySetInnerHTML={{ __html: formatDate(startOfStake) }} /></span>
                      </span> :
                      <span className="posLtop posLtop--end" style={{ right: `${progressCompleted < 100 ? ((100 - progressCompleted) + 1) : 1}%`}}>
                        <span className="text-success label-medium">{`${progressCompleted < 100 ? (`+${formatDecimal(rewardsEarned, 8)} $YOP`) : 'Staking Complete'}`}</span>
                        {progressCompleted < 100 &&
                          <span className="d-block label-small font-weight-medium"><span dangerouslySetInnerHTML={{ __html: formatDate(startOfStake) }} /></span>
                        }
                      </span>
                    }
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style={{ width: `${progressCompleted}%` }}></div>
                    </div>
                    <span className="posLbott"><span className="d-block label-small font-weight-medium">Staked On</span><span className="d-block text-primary font-weight-medium"><span dangerouslySetInnerHTML={{ __html: formatDate(startOfStake) }} /></span></span>
                    <span className="posRbott text-right"><span className="d-block label-small font-weight-medium">Claim Reward On</span><span className="d-block text-primary  font-weight-medium"><span dangerouslySetInnerHTML={{ __html: formatDate(endOfStake) }} /></span></span>
                  </div>
                </div>
                <div className="ypBox__bottom text-center">
                  <button className="btn btn-primary btn-mw300 unclaim" disabled={progressCompleted < 100} onClick={() => onClaim()}>UNSTAKE & CLAIM REWARD</button>
                </div>
              </div>
              {txHash ?
                <div className="ypBox--active d-flex justyfy-content-center align-items-center flex-wrap flex-column">
                  <div className="ypInnner flex-row">
                    <h5 className="text-white font-weight-normal mb-5">Claim transaction pending...</h5>
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
            className="stake-active"
          />
        </Row>
      </Container>
    </section>
  )
}

export default StakeBarActive;
