// import { Button, Grid, TextField, Paper, Container, Typography } from '@material-ui/core';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Row, Col, Container } from 'react-bootstrap';
import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ErrorBox from "./ErrorBox";

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  email:'',
  password:'',
  error: null
  }
  this.handleInput = this.handleInput.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}

onSubmit(e) {
    e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        console.log('sending data to POST/login: ', data);
        
        //make a post request with the user data
        axios.post('http://localhost:3001/login', data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        error : null
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    error : 'Invalid User Name or password'
                });
            });
}

handleInput(e) {
    this.setState({[e.target.name] : e.target.value});  
}

render() {
    const errBox = (this.state.error != null) ? <ErrorBox message={this.state.error}/>:null;
    return (
        

        <Container fluid={true}>
        <Row sm={10}>
        <Col sm={5} style={{background : '#1569e0', color: '#fff'  }}>
        <Container fluid='true' >
            <h1>Welcome to handshake</h1>
        </Container>
        </Col>
        <Col  sm={5}>
        <Container fluid={false}>
            {errBox}
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
            <Button onClick={this.onSubmit}>Submit</Button>
            </Form> 
        </Container>
        

        </Col>
           
        </Row>
        
        </Container>
     
            
    );
  }
}

export default Login;