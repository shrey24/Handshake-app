import React, { useState, useEffect } from 'react';
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, Card, CardBody, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types';



const AddJobForm = (props) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const [stdFormData, setStdFormData] = useState({
        job_title: '',
        job_location: '',
        deadline: '',
        salary: '',
        job_desc: '',
        job_catagory: '',
        post_date: yyyy + '-' + mm + '-' + dd,
        company_name: ''
    });

    useEffect(() => {
        if(props.profile) {
            console.log('***************** props.profile');
            console.log(props.profile);
            setStdFormData({company_name: props.profile[0].name});
        }
    }, [props.profile]);

    const handleInput = e => {
        setStdFormData({...stdFormData, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('send data to /company/job: ', stdFormData);
    };

    

    return (
        <Container>
        <Card>
        <CardBody>
        
        <CardTitle>
         New Job Posting 
        </CardTitle>
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
        <Button color='success' onClick={(e) => onSubmit(e)} >Post New Opening</Button>
        </Col>
        </Row>
        </Form> 

        </CardBody>
        </Card>
        </Container>
    )
};

AddJobForm.propTypes = {
    setAlert : propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    profile: propTypes.array.isRequired,
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.company.profile
});
export default connect(mapStateToProps)(AddJobForm);
