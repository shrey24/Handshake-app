import React, { useState, useEffect } from 'react';
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, Card, CardBody, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import axios from 'axios';
import { setAlert } from '../../../actions/alert';
import { JOB_CAT } from '../../../actions/types';

const EventForm = (props) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const [stdFormData, setStdFormData] = useState({
        event_name: '',
        desc: '',
        // event_major: JOB_CAT.FULLTIME,
        date_time: yyyy + '-' + mm + '-' + dd,
        company_name: '',
        company_avatar: ''
    });

    useEffect(() => {
        if(props.profile) {
            console.log('***************** props.profile');
            console.log(props.profile);
            setStdFormData({
                ...stdFormData, 
                company_name: props.profile[0].name,
                company_avatar: props.profile[0].avatar_path
            });
        }
    }, [props.profile]);

    const handleInput = e => {
        setStdFormData({...stdFormData, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('send data to /events: ', stdFormData);
        axios.post('/events', stdFormData)
        .then(res => {
            console.log('new event added res:', res);            
            props.onCancel();
        })
        .catch(err => {
            console.log('ADD JOB ERR: ', err);
            props.setAlert('Unable to add job', 'danger');
        });
    };

    return (
        <Container>
        <Card>
        <CardBody>
        <CardTitle>
         Create New Event
        </CardTitle>
        <Form >
        <FormGroup>
        <Label for="event_name">Event Name:</Label>
            <Input 
                onChange={handleInput}
                name="event_name"
                value = {stdFormData.event_name}
                type="text"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="desc">Event Description:</Label>
            <Input 
                onChange={handleInput}
                name="desc"
                value = {stdFormData.desc}
                type='textarea'
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="event_major">Eligibile Majors:</Label>
            <Input 
                onChange={handleInput}
                name="event_major"
                value = {stdFormData.event_major}
                type='text'
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="date_time">Date of event:</Label>
            <Input 
                onChange={handleInput}
                name="date_time"
                value = {stdFormData.date_time}
                type='date'
                required
            />
        </FormGroup>
        <Row>
        <Col>
        <Button color='success' onClick={(e) => onSubmit(e)} >Create new event</Button>
        </Col>
        </Row>
        </Form> 

        </CardBody>
        </Card>
        </Container>
    )
};

EventForm.propTypes = {
    setAlert : propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    profile: propTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.company.profile
});
export default connect(mapStateToProps, {setAlert})(EventForm);
