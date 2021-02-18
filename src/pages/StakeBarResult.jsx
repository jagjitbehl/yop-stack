import React,{Component} from 'react';
import {
  Container, Row, Col, Button, Input
} from 'reactstrap';

import Icon1 from '../assets/images/1.png';
import Icon2 from '../assets/images/2.png';
import Icon3 from '../assets/images/3.png';
import Icon5 from '../assets/images/5.png';
import IconLock from '../assets/images/lockIcon.png';
import pLogo from '../assets/images/pLogo.png';
import ypGraph from '../assets/images/ypGraph.jpg';
import inpuIcon from '../assets/images/purpleCircle.png';
import { formatDecimal, getHashLink } from '../yop/utils';

function StakeBarResult({
  stakerInfos,
  contractInfos,
  stakeResultHash,
  networkId,
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
  } = stakerInfos;

  return(
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
                  <span className="text-muted label-medium">Available $YOP Balance <span className="pl-1 text-secondary">750,000.00</span></span>
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
                          <Input type="text" />
                        </div>
                        <span className="text-primary label-medium font-weight-bold pl-3">MAX</span>
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
                        <span className="cValue cValue-primary">30</span>
                        <span className="cValue cValue-light">60</span>
                        <span className="cValue cValue-light">90</span>
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
                  <Button color="secondary" disabled className="btn-mw300">STAKE</Button>
                </div>
              </div>
              <div className="ypBox--active d-flex justyfy-content-center align-items-center flex-wrap flex-column">
                <div className="ypInnner flex-row">
                  <img className="mb-5" src={IconLock} />
                  <h4 className="text-white font-weight-normal"><span><strong>{formatDecimal(amount, 8)}</strong> $YOP Unstaked</span><span className="px-4">|</span><span><strong>{formatDecimal(rewardPool, 8)}</strong> $YOP Earned</span></h4>
                </div>
                {stakeResultHash &&
                <a href={`${getHashLink(networkId, stakeResultHash)}`} className="pb-5 text-white text-underline" rel="noreferrer" target="_blank"><u>View Transaction on Etherscan</u></a>
                }
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

export default StakeBarResult;
