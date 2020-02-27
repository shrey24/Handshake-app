import { Button, Container } from '@material-ui/core';
import React, { Component } from 'react'

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
 }
render() {
    return (
      <Container>
          <Button variant='contained' color='primary'>
              Login
          </Button>
      </Container>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;