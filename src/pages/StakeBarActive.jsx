import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container, Row, Col,
} from 'reactstrap';
import moment from 'moment';

import { yopTokenContract, stakingContract } from '../yop/contracts';
import { formatDecimal } from '../yop/utils';

import Icon1 from '../assets/images/1.png';
import Icon3 from '../assets/images/3.png';
import Icon5 from '../assets/images/5.png';

function StakeBarActive({
  stakerInfos,
  contractInfos,
}) {
  const [txHash, setTxHash] = useState(null);

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

  const address = useSelector(state => state.authUser.address);

  const progressCompleted = Math.floor(((Date.now() - startOfStakeMillis) / (endOfStakeMillis - startOfStakeMillis)) * 100);

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
        setTxHash(null);
      })
      .on('error', (error) => {
        console.log('error', error);
        setTxHash(null);
      });
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
                <div className="ypHeadRight" />
              </div>
              <div className="ypBox__content">
                <div className="ypBox__block">
                  <Row>
                    <Col md="6" xs="12">
                      <div className="ypLeft d-flex align-items-center">
                        <img className="ypdIcon mr-2" src={Icon1} /> <span className="label-medium font-weight-medium">Stake Amount</span>
                        <span className="label-medium font-weight-medium text-primary pl-3">{formatDecimal(amount, 8)}</span>
                        <span className="label-medium font-weight-medium text-primary pl-3">$YOP</span>
                      </div>
                    </Col>
                    <Col md="6" xs="12">
                      <div className="ypRight ypRight--icon d-flex align-items-center justify-content-md-end">
                        <img className="ypdIcon" src={Icon3} />
                        <span className="label-medium font-weight-medium pl-1">Rewards Earned (YTD)</span>
                        <span className="label-medium font-weight-medium text-success mb-0 pl-3">{`${formatDecimal(reward, 8)}`} $YOP</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ypBox__block">
                  <div className="progressWrap my-5">
                    <span className="posLtop posLtop--end" style={{ left: '75%' }}><span className="text-success label-medium">Staking Complete</span></span>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style={{ width: `${progressCompleted}%` }}></div>
                    </div>
                    <span className="posLbott"><span className="d-block text-primary font-weight-medium">{moment(startOfStake).format('Do MMMM YYYY')}</span></span>
                    <span className="posRbott text-right"><span className="d-block text-primary  font-weight-medium">{moment(endOfStake).format('Do MMMM YYYY')}</span></span>
                  </div>
                </div>
                <div className="ypBox__bottom text-center">
                  <button className="btn btn-primary btn-mw300" onClick={() => onClaim()}>UNSTAKE & CLAIM REWARD</button>
                </div>
              </div>
            </div>
          </Col>
          <Col md="3" xs="12">
            <div className="ypBox ypBox--rBlock text-center h-md-100">
              <div className="ypBox__block ypBox__block--border">
                <div className="yBoxSmall">
                  <h5>Total Reward</h5>
                  <p>{formatDecimal(rewardPool, 8)}</p>
                </div>
              </div>
              <div className="ypBox__block ypBox__block--border">
                <div className="yBoxSmall">
                  <h5>Reward Remaining</h5>
                  <p>{formatDecimal(rewardsOwed, 8)}</p>
                </div>
              </div>
              <div className="ypBox__block">
                <div className="yBoxSmall">
                  <h5>TVL</h5>
                  <p>{formatDecimal(tvl, 8)}</p>
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
