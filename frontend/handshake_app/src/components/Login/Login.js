// import { Button, Grid, TextField, Paper, Container, Typography } from '@material-ui/core';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import React, { Component } from 'react'

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  email:'',
  password:''
  }
  this.handleInput = this.handleInput.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}

onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
}

handleInput(e) {
    this.setState({[e.target.name] : e.target.value});  
}

render() {
    return (
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
            <Form onSubmit={this.onSubmit}>
                <h2> Student Sign In </h2>
            <FormGroup>
            <Label for="inpEmail">Email</Label>
            <Input 
                onChange={this.handleInput}
            type="email" name="email" id="inpEmail" placeholder="Email id" 
            />
            </FormGroup>
            <FormGroup>
            <Label for="password">Password</Label>
            <Input 
                onChange={this.handleInput}
            type="password" name="password" id="password" placeholder="password" />
            </FormGroup>
            <Button>Submit</Button>
            </Form> 

            </div>
           
        </div>
            
    );
  }
}

export default Login;