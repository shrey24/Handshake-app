import React, { useState } from 'react';
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, Card } from 'reactstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { setAlert } from '../../../actions/alert';
import AlertComp from '../../AlertComp';


const AddJobForm = (props) => {

    const [stdFormData, setStdFormData] = useState({
        job_title: '',
        job_location: '',
        deadline: '',
        salary: '',
        job_desc: '',
        job_catagory: '',
        post_date: '',
        company_name: ''
    });

    const handleInput = e => {
        setStdFormData({...stdFormData, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('send data to /company/job: ', stdFormData);
    };

    return (
        <div>
        <Container>
        <Card>
        <Card.Body>
        <AlertComp />
        <Card.Title>
         New Job Posting 
        </Card.Title>
        <Form onSubmit={e => onSubmit(e)}>
        <FormGroup>
        <Label for="job_title">Job Title:</Label>
            <Input 
                onChange={handleInput}
                name="job_title"
                value = {stdFormData.job_title}
                type="text"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="job_location">Location:</Label>
            <Input 
                onChange={handleInput}
                name="job_location"
                value = {stdFormData.job_location}
                type="text"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="job_desc">Description:</Label>
            <Input 
                onChange={handleInput}
                name="job_desc"
                value = {stdFormData.job_desc}
                type='textarea'
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="deadline">deadline to apply:</Label>
            <Input 
                onChange={handleInput}
                name="deadline"
                value = {stdFormData.deadline}
                type='date'
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="salary">salary:</Label>
            <Input 
                onChange={handleInput}
                name="salary"
                value = {stdFormData.salary}
                type="number"
            />
        </FormGroup>
        <Row>
        <Col>
        <Button onClick={(e) => onSubmit(e)} >Create account</Button>
        </Col>
        </Row>
        </Form> 

        </Card.Body>
        </Card>
        </Container>
        </div>
    );
};

AddJobForm.propTypes = {
    setAlert: propTypes.func.isRequired,
};

export default connect(null, { setAlert })(AddJobForm);
