import React from 'react';
import {
  Container, Row, Col, Input,
} from 'reactstrap';
import { useHistory, useLocation } from "react-router-dom";
import circleIcon from '../assets/images/circleIcon.png';
import unicorn from '../assets/images/unicorn.png';

export function UnicornBanner(){
  const history = useHistory();
  
	const handleVideoLnk = () => {
		history.push('/stakevideo');
	}

	return (
    <Col xs="12">
	    <div className="primary-bg radius-20 notiWrap mb-5">
	    <div className="d-flex justify-content-between align-items-center text-white">
	      <div className="dvOne text-white">
	        <p><img src={unicorn} alt="unicorn" className="uIcon" /></p>
	      </div>
	      <div className="dvTwo text-white">
	        <p>Don’t be afraid of being a crypto loving noob! Watch the video and learn how to earn!</p>
	      </div>
	      <div className="dvThree text-white">
	        <p onClick={handleVideoLnk}><img width="30" src={circleIcon} alt="unicorn" className="circleIcon" /></p>
	      </div>
	    </div>
	  </div>
	  </Col>
		)
}