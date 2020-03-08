// import { Button, Grid, TextField, Paper, Container, Typography } from '@material-ui/core';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Row, Col, Container } from 'react-bootstrap';
import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';

import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { setAlert } from '../../actions/alert';
import propTypes from 'prop-types';
import AlertComp from '../AlertComp'
import { loginUser } from '../../actions/auth';

class Login extends Component {
constructor(props){
  super(props);
  console.log("LOGIN PROPS: ", props);
  this.state = {
  email:'',
  password:'',
  error: null
  }
//   this.handleInput = this.handleInput.bind(this);
//   this.onSubmit = this.onSubmit.bind(this);
}

onSubmit = async (e, user_type) => {
    e.preventDefault();
    console.log("onSubmit Login:", user_type);
    this.props.loginUser(this.state.email, this.state.password, user_type);
};

handleInput = (e) => {
    this.setState({[e.target.name] : e.target.value});  
};

render() {
    // Redirect if logged in
    if(this.props.isAuthenticated) {
        if(this.props.user.user_type === 'student')
            return <Redirect to='/student/profile' />;
        else {
            console.log('USER already logged in.. REDIRECT TO Company...');
        }
    }
    else
    // const errBox = (this.state.error != null) ? <ErrorBox message={this.state.error}/>:null;
    return (
        <Container fluid='true'>
        
        <Row >
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

Login.propTypes = {
    setAlert: propTypes.func.isRequired,
    loginUser: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool,
    user: propTypes.object
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { setAlert, loginUser })(Login);