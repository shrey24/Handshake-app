import React, { useState } from 'react';
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AlertComp from '../../AlertComp';

const ExperienceForm = (props) => {
    const [experience, setExperience] = useState({
            "company_name": '',
            "title": '',
            "location": '',
            "start_date": '',
            "end_date": '',
            "work_desc": ''
    });

    const [isEditMode, setEditMode] = useState(false);

    if(props.data) { // edit mode
        setEditMode(true);
        setExperience(Object.assign({}, props.data)); // also contains id & user_id
    }

    const handleInput = e => {
        let val = e.target.value;
        setExperience({ ...experience, [e.target.name]: val });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isEditMode)
            console.log('Call action Update experience', experience);
        else 
            console.log('Call Action AddExperience');
    }

    return (
        <div>
            <Container>
            <AlertComp />

        <Form onSubmit={e => onSubmit(e)}>
        <FormGroup>
        <Label for="company_name">Company Name</Label>
            <Input 
                onChange={handleInput}
                name="company_name"
                value = {experience.company_name}
                type="text"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="title">Title </Label>
            <Input 
                onChange={handleInput}
                name="title"
                value = {experience.title}
                type="text"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="location">Location</Label>
            <Input 
                onChange={handleInput}
                name="location"
                value = {experience.location}
                type="text"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="start_date">From </Label>
            <Input 
                onChange={handleInput}
                name="start_date"
                value = {experience.start_date}
                placeholder = 'start date'
                type="number"
            />
        </FormGroup>
        <FormGroup>
        <Label for="end_date">To</Label>
            <Input 
                onChange={handleInput}
                name="end_date"
                value = {experience.end_date}
                placeholder = 'end date'
                type="text"
            />
        </FormGroup>
        <FormGroup>
        <Label for="word_desc">Job Description</Label>
            <Input 
                onChange={handleInput}
                name="word_desc"
                value = {experience.word_desc}
                type="textarea"
            />
        </FormGroup>

        <Row>
        <Col>
        <Button 
        onClick={(e) => onSubmit(e)} 
        color="success">
            { isEditMode ? 'Update' : 'Add new experince' }
        </Button>
        </Col>

        <Col>
        <Button 
        onClick={(e) => props.onCancel()} 
        color="secondary">
            Cancel
        </Button>
        </Col>
        </Row>
        
        </Form> 
        </Container>
        </div>
    )
};

export default ExperienceForm;
