import React from 'react';
import {
  Container, Row, Col, Input,
} from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import unicorn from '../assets/images/unicorn.png';
import notNoob from '../assets/images/not-a-noob-unicorn.png';

export function StakeHomeScreen() {
	const history = useHistory();

	const handleClick = (value) => {
		if (value === 'noob') {
			history.push('/stakevideo');
		} else {
			history.push('/stake');
		}
	}
  return (
    <section className="innerSec stakeSec pt-md-0 pt-5">
      <Container>
      	<Row>
      		<Col xs="12">
      			<div className="primary-bg scBlock">
              <div className="scWrap text-center">
								<Row className="align-items-end">
								  <Col md="6" xs="12">
								    <div className="scBlkIn">
								        <img src={unicorn} alt="unicorn" className="unicorn" />
								        <div className="scBlkIn__btn">
								        	<Link onClick={() => handleClick('noob')}>I am a noob that loves crypto, show me the video first!</Link>
								        </div>
								    </div>
								  </Col>
								  <Col md="6" xs="12">
								    <div className="scBlkIn">
								      <img src={notNoob} alt="notNoob" className="w250" />
								        <div className="scBlkIn__btn">
								        	<Link onClick={() => handleClick('pro')}>{`I am a pro, burnt my fiat already. Let's get stacking!`}</Link>
								        </div>
								    </div>
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