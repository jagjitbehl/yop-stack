import React from 'react';
import {
  Container, Row, Col, Input,
} from 'reactstrap';

export function StakeVideo() {
  return (
    <section className="innerSec stakeSec pt-md-0 pt-5">
      <Container>
      	<Row>
      		<Col xs="12">
      			<div className="primary-bg scBlock">
              <div className="scWrap text-center">
								<Row className="align-items-end">
								  <Col md="6" xs="12">
								    <div className="scBlkIn" />
								  </Col>
								  <Col md="6" xs="12">
								    <div className="scBlkIn" />
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

export default StakeVideo;