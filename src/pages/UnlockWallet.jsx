import React from 'react';
import {
  Container, Row, Col, Input,
} from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import noob from '../assets/images/nbIcon.PNG';
import pro from '../assets/images/prIcon.PNG';
import yopLandIcon from '../assets/images/yopLandIcon.png';
import star from '../assets/images/star.png';

export function UnlockWallet({
	onMetamaskConnect,
}) {

  const history = useHistory();

  const handleClick = (value) => {
    history.push('/stakevideo');
  }

  return (
    <section className="innerSec stakeSec pt-md-0 pt-5">
      <Container>
        <Row>
          <Col md="7" xs="12">
            <div className="innerContent">
              <div className="ypHead mb-5">
                <h2 className="text-primary"><img src={yopLandIcon} className="mr-2" />YOP Vault!</h2>
                <p>YOP Vault is a custom built staking product allow simple and<br/>
                easy yield generation with YOP tokens. Find out more <a className="text-primary text-underline" href="#">here.</a></p>
              </div>
              <div className="d-block mb-4">
                <span className="ypTags ypTags--outline-primary text-uppercase">YOP Single Asset</span>
                <span className="ypTags ypTags--outline-primary text-uppercase ml-3"><img src={star} alt="Start" className="mr-1" style={{ position: 'relative', top: '-3px'}} />YOP Single Asset</span>
              </div>
              <div className="btnWrap mb-md-0 mb-4">
                <Row>
                  <Col md="6" xs="12">
                    <button className="btntCol unlock-wallet" onClick={handleClick}>
                      <img src={noob} alt="" />
                        I am a noob that loves crypto,
                        show me the video first!
                    </button>
                  </Col>
                  <Col md="6" xs="12">
                    <button className="btntCol unlock-wallet" onClick={() => onMetamaskConnect()}>
                      <img src={pro} alt="" />
                        I am a pro, burnt my fiat
                        already. Lets get staking!
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col md="5" xs="12">
            <div className="gBox gBox--width gBox--padding">
              <div className="gBox__head text-center pb-4">
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
              <div className="gBox__helper d-flex align-items-center justify-content-center text-center">
                <h1 className="text-white">Coming<br />Soon</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}