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
                <Nav>
                  <NavItem>
                    <NavLink href="#">yPlatform</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">yProtocol</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">$YOP Token</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active href="#">Stake</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">Media</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">Team</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">Partners</NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    )
  }
}

export default Header;
