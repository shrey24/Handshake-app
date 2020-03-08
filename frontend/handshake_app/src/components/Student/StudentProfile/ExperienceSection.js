import React, { useState } from 'react'
import { Button, Label, Form, FormGroup, Input, Container, Col, Row } from 'reactstrap';
import { Card } from 'react-bootstrap';

import { connect } from 'react-redux';
import AlertComp from '../../AlertComp';
import { setAlert } from '../../../actions/alert';
import propTypes from 'prop-types';
import ExperienceForm from './ExperienceForm';

const ExperienceSection = (props) => {
    const [experienceData, setExperienceData] = useState([...props.data]);
    const [editId, setEditId] = useState(-1);
    const [addNewForm, setAddNewForm] = useState(false);

    const cancelEditForm = () => setEditId(-1);
    const cancelAddForm = () => setAddNewForm(false);

    return (
        <Card >
        <Card.Body>                
        <Card.Title>
            <h3> Education </h3>
        </Card.Title>
        {
            experienceData.map((item) => {
                if ( item.id === editId ) {
                    return <ExperienceForm data={item} onCancel={cancelEditForm}/>;
                } else {
                    return (
                    <div key={item.id}>
                    <Card.Title>
                    <h5>  {item.title} </h5>
                    </Card.Title>
                    <Card.Subtitle>{item.company_name}, {item.location}</Card.Subtitle>
                    <Card.Subtitle> {item.start_date} - {item.end_date}</Card.Subtitle>
                    <Card.Text> <b>Description</b><br/> {item.work_desc} </Card.Text>
                    <Button color='link' onClick={() => setEditId(item.id)}>
                        Edit
                    </Button>
                    </div>
                    );
                }
            })
        }

        <br />
        <hr />
        {
            (addNewForm) ? (<ExperienceForm onCancel={cancelAddForm}/>) : 
            (
                <Button color='link' onClick={ e => setAddNewForm(true)}/>
            )
        }
        </Card.Body>
        </Card>
    );
};

ExperienceSection.propTypes = {
    data: propTypes.array.isRequired,
}

export default ExperienceSection;


