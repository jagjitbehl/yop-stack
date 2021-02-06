import React,{Component} from 'react';
import {
  Container, Row, Col, Button,
} from 'reactstrap';

class Stake extends Component{
  constructor(props) {
    super(props);
    this.state = '';
  }
  render() {
    return(
      <section className="innerSec stakeSec">
        <Container>
          <Row>
            <Col md="6" xs="12">
              <div className="innerContent">
                <div className="ypHead mb-5">
                  <h2 className="text-primary">Staking Now Live!</h2>
                  <p>Some pretty words here?</p>
                </div>
                <div className="btnWrap">
                  <span className="ypTags ypTags--outline-primary">Yop/Eth</span><br />
                  <Button color="primary">Unlock Wallet</Button>
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
                  <Col md="6" xs="12" className="text-md-right text-center pb-4">
                    <span className="ypTags">YOP / SUSHI</span>
                  </Col>
                  <Col md="6" xs="12" className="text-md-left text-center pb-4">
                    <span className="ypTags">YOP / ETH LP</span>
                  </Col>
                  <Col md="6" xs="12" className="text-md-right text-center pb-md-0 pb-4">
                    <span className="ypTags">YOP / COMP</span>
                  </Col>
                  <Col md="6" xs="12" className="text-md-left text-center pb-0">
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
}

export default Stake;
