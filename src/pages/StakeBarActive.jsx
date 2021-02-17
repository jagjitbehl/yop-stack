import React, {useEffect} from 'react';
import {
  Container, Row, Col, Button, Input
} from 'reactstrap';
import moment from 'moment';

import Icon1 from '../assets/images/1.png';
import Icon3 from '../assets/images/3.png';
import Icon5 from '../assets/images/5.png';
import ypGraph from '../assets/images/ypGraph.jpg';

function StakeBarActive({
  stakerInfos,
  contractInfos,
}) {

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
    stakingTime,
  } = stakerInfos;

  console.log('stakerInfos', stakerInfos);
  const progressCompleted = Math.floor(((Date.now() - startOfStakeMillis) / (endOfStakeMillis - startOfStakeMillis)) * 100);
  console.log('progressCompleted', progressCompleted);

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
                <div className="ypHeadRight" />
              </div>
              <div className="ypBox__content">
                <div className="ypBox__block">
                  <Row>
                    <Col md="6" xs="12">
                      <div className="ypLeft d-flex align-items-center">
                        <img className="ypdIcon mr-2" src={Icon1} /> <span class="label-medium font-weight-medium">Stake Amount</span>
                        <span class="label-medium font-weight-medium text-primary pl-3">{amount.toString()}</span>
                        <span class="label-medium font-weight-medium text-primary pl-3">$YOP</span>
                      </div>
                    </Col>
                    <Col md="6" xs="12">
                      <div className="ypRight ypRight--icon d-flex align-items-center justify-content-md-end">
                        <img className="ypdIcon" src={Icon3} /> 
                        <span class="label-medium font-weight-medium pl-1">Rewards Earned (YTD)</span>
                        <span className="label-medium font-weight-medium text-success mb-0 pl-3">{`${reward.toString()}`} $YOP</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ypBox__block">
                  <div className="progressWrap my-5">
                    <span className="posLtop posLtop--end" style={{ left: '75%'}}><span className="text-success label-medium">Staking Complete</span></span>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style={{ width: '92%'}}></div>
                    </div>
                    <span className="posLbott"><span className="d-block text-primary font-weight-medium">{moment(startOfStake).format('Do MMMM YYYY')}</span></span>
                    <span className="posRbott text-right"><span className="d-block text-primary  font-weight-medium">{moment(endOfStake).format('Do MMMM YYYY')}</span></span>
                  </div>
                </div>
                <div className="ypBox__bottom text-center">
                <a href="/processresult" className="btn btn-primary btn-mw300">UNSTAKE & CLAIM REWARD</a>
                </div>
              </div>
            </div>
          </Col>
          <Col md="3" xs="12">
            <div className="ypBox ypBox--rBlock text-center h-md-100">
            <div className="ypBox__block ypBox__block--border">
              <div className="yBoxSmall">
                <h5>Total Reward</h5>
                <p>{rewardPool ? rewardPool.toString() : '0'}</p>
              </div>
            </div>
            <div className="ypBox__block ypBox__block--border">
              <div className="yBoxSmall">
                <h5>Reward Remaining</h5>
                <p>{rewardsOwed ? rewardsOwed.toString() : '0'}</p>
              </div>
            </div>
            <div className="ypBox__block">
              <div className="yBoxSmall">
                <h5>TVL</h5>
                <p>{tvl ? tvl.toString() : '0'}</p>
              </div>
            </div>
            </div>
          </Col>
        </Row>          
      </Container>
    </section>
  )
}

export default StakeBarActive;
