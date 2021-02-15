import React,{Component} from 'react';
import {
  Container, Row, Col, Nav, NavItem, NavLink
} from 'reactstrap';
import logo from '../assets/images/YOP-logo-purple.png';

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = '';
  }
  render() {
    return(
      <header className="stHeader">
        <Container>
          <Row>
            <Col xs="12">
              <div className="menuwrap">
                <div className="logoWrap">
                  <a href="/">
                    <img src={logo} alt="Yop" />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    )
  }
}

export default Header;
