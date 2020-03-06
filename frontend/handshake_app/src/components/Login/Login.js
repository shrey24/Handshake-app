// import { Button, Grid, TextField, Paper, Container, Typography } from '@material-ui/core';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Row, Col, Container } from 'react-bootstrap';
import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import ErrorBox from "./ErrorBox";
import { connect } from "react-redux";
import { setAlert } from '../../actions/alert';
import propTypes from 'prop-types';
import AlertComp from '../Alert'
import { loginUser } from '../../actions/auth';

class Login extends Component {
constructor(props){
  super(props);
  console.log("LOGIN PROPS: ", props);
  this.state={
  email:'',
  password:'',
  error: null
  }
  this.handleInput = this.handleInput.bind(this);
//   this.onSubmit = this.onSubmit.bind(this);
}

onSubmit = async (e, user_type) => {
    e.preventDefault();
    const data = {
        email : this.state.email,
        password : this.state.password
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    let loginApi = null
    if(user_type === 'student') {
        loginApi = 'http://localhost:3001/login/student';
    } else {
        loginApi = 'http://localhost:3001/login/company';
    }
    console.log(`sending data to ${loginApi} `, data);
    try {
        const res = await axios.post(loginApi, data);
        console.log("Status Code : ",res.status);
        console.log("Login Success", res);
    } catch (error) {
        console.log("Login Error: ", error.response );
        this.props.setAlert('Invalid username or password', 'danger');               
    }
}

handleInput(e) {
    this.setState({[e.target.name] : e.target.value});  
}

render() {
    const errBox = (this.state.error != null) ? <ErrorBox message={this.state.error}/>:null;
    return (
        


        <Container fluid={true}>
        <Row sm={10}>
        <Col sm={6} style={{background : '#1569e0', color: '#fff'  }}>
        <Container fluid='true' >
            <h1>Welcome to handshake</h1>
        </Container>
        </Col>

        <Col  sm={5}>

        <Container fluid={false}>
            <p>
                <Link to='/register'> Dont have an account? Sign up</Link>
            </p>
            {errBox}
            <AlertComp />
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
            <Button onClick={(e) => this.onSubmit(e, 'student')}>Submit</Button>
            </Form> 
        </Container>
        

        </Col>
           
        </Row>
        
        </Container>
            
    );
  }
}

Login.prototypes = {
    setAlert: propTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
}

export default connect(null, { setAlert, loginUser })(Login);