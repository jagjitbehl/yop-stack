import React,{Component} from 'react';
import {
  Container, Button
} from 'reactstrap';

class Content extends Component{
  constructor(props) {
    super(props);
    this.state = '';
  }
  render() {
    return(
      <section className="innerSec">
        <Container>
          <div className="btnWrap">
            <Button color="primary">Unlock Wallet</Button>
          </div>
        </Container>
      </section>
    )
  }
}

export default Content;
