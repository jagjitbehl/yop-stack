import React from 'react';
import {
  Container, Row, Col, Input,
} from 'reactstrap';

export function UnlockWallet({
	onMetamaskConnect,
}) {
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
                <span className="ypTags ypTags--outline-primary text-uppercase">Yop</span><br />
                {/* <Link to="/token" className="btn btn-primary">Unlock Wallet</Link> */}
                <button className="btn btn-primary unlock-wallet" onClick={() => onMetamaskConnect()}>Unlock Wallet</button>
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