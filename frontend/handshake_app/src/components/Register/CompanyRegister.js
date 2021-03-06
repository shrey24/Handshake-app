import React, { useState } from 'react'
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import { registerUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import AlertComp from '../AlertComp';


const CompanyRegister = (props) => {

    const [stdFormData, setStdFormData] = useState({
        email: '',
        password: '',
        name: '',
        location: '',
    });

    const handleInput = e => {
        setStdFormData({...stdFormData, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('send data to /company: ', stdFormData);
        props.registerUser(stdFormData, 'company');
    }

    return (
        <div>
            <Container>
                <h3> Company Registration </h3>
                <AlertComp />

            <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
            <Label for="name">Company Name:</Label>
                <Input 
                    onChange={handleInput}
                    name="name"
                    value = {stdFormData.name}
                    type="text"
                    required
                />
            </FormGroup>
            <FormGroup>
            <Label for="location">Location:</Label>
                <Input 
                    onChange={handleInput}
                    name="location"
                    value = {stdFormData.location}
                    type="text"
                    required
                />
            </FormGroup>
            <FormGroup>
            <Label for="email">email:</Label>
                <Input 
                    onChange={handleInput}
                    name="email"
                    value = {stdFormData.email}
                    type="email"
                    required
                />
            </FormGroup>
            <FormGroup>
            <Label for="password">Password:</Label>
                <Input 
                    onChange={handleInput}
                    name="password"
                    value = {stdFormData.password}
                    type="password"
                    required
                />
            </FormGroup>
            <Row>
            <Col>
            <Button onClick={(e) => onSubmit(e)} >Create account</Button>
            </Col>
            </Row>
            
            </Form> 
            </Container>
            </div>
    );
}

CompanyRegister.propTypes = {
    setAlert: propTypes.func.isRequired,
    registerUser: propTypes.func.isRequired
}

export default connect(null, { setAlert, registerUser })(CompanyRegister);
