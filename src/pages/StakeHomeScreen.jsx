import React from 'react';
import {
  Container, Row, Col, Input,
} from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import unicorn from '../assets/images/nUni_turn.png';
import notNoob from '../assets/images/horseMen.png';

export function StakeHomeScreen({
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
      		<Col xs="12">
      			<div className="primary-bg scBlock">
              <div className="scWrap text-center">
              	<Row>
              		<Col md="8" xs="12" className="mx-auto">
              			<Row className="align-items-end">
										  <Col md="6" xs="12">
										    <div className="scBlkIn">
										    		<div className="hsImg">
										        	<img src={unicorn} alt="unicorn" className="unicorn" />
										        </div>
										        <div className="scBlkIn__btn">
										        	<Link onClick={handleClick}>I am a noob that loves crypto, show me the video first!</Link>
										        </div>
										    </div>
										  </Col>
										  <Col md="6" xs="12">
										    <div className="scBlkIn">
											    	<div className="hsImg">
											      	<img src={notNoob} alt="notNoob" className="w250" />
										      	</div>
										        <div className="scBlkIn__btn">
										        	<Link onClick={onMetamaskConnect}>{`I am a pro, burnt my fiat already. Let's get staking!`}</Link>
										        </div>
										    </div>
										  </Col>
										</Row>
              		</Col>
              	</Row>								
							</div>
            </div>
      		</Col>
      	</Row>
      </Container>
    </section>
  )	
}

export default StakeHomeScreen;