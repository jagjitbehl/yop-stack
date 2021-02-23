import React from 'react';
import {
  Container, Row, Col, Input, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import { useHistory, useLocation } from "react-router-dom";

export function StakeVideo({
	handleBanner,
}) {

  const history = useHistory();
  const location = useLocation();
  console.log('location', location);

	const toggle = () => {
		if (location.pathname === '/stakevideo') {
			history.push('/');
		} else {
      handleBanner(false);
		}  
	}

  return (
      <Modal isOpen toggle={toggle} modalClassName="vdoModal">
        <button type="button" onClick={toggle} className="close mdlBtn" aria-label="Close"><span aria-hidden="true">×</span></button>
        <ModalBody>
          <div className="scVdo">
          	<iframe width="560" height="315" src="https://www.youtube.com/embed/fhMnCxIhnBU" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </ModalBody>
      </Modal>
  )	
}

export default StakeVideo;