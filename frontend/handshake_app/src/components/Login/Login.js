// import { Button, Grid, TextField, Paper, Container, Typography } from '@material-ui/core';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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
        <div className="row ">
            {errBox}
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
            <Button onClick={this.onSubmit}>Submit</Button>
            </Form> 

            </div>
           
        </div>
            
    );
  }
}

export default Login;