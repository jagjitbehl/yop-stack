import React from 'react';
import {
  Container, Row, Col, Input,
} from 'reactstrap';
import { useHistory, useLocation } from "react-router-dom";
import circleIcon from '../assets/Icons/play-button.svg';
import unicorn from '../assets/images/nUni_turn.png';
import noob from '../assets/images/nbIcon.PNG';

export function UnicornBanner({
	handleBanner,
}) {

	return (
    <Col xs="12">
	    <div className="primary-bg radius-20 notiWrap mb-5">
	    <div className="d-flex justify-content-between align-items-center text-white">
	      <div className="dvOne text-white">
	        <p><img src={noob} alt="unicorn" className="uIcon" /></p>
	      </div>
	      <div className="dvTwo text-white">
	        <p>Don’t be afraid of being a crypto loving noob! Watch the video and learn how to earn!</p>
	      </div>
	      <div className="dvThree text-white">
	        <p onClick={() => handleBanner(true)}><img width="30" src={circleIcon} alt="unicorn" className="cursor-pointer circleIcon icon-30" /></p>
	      </div>
	    </div>
	  </div>
	  </Col>
	)
}