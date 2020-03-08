import React, { useState } from 'react'
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, CardText } from 'reactstrap';

import { connect } from 'react-redux';
import AlertComp from '../AlertComp';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



const ExperienceSection = (props) => {
    const [experienceData, setExperienceData] = useState([]);

    setExperienceData([...props.data]);

    return (
        <div>


            
        </div>
    )
};

ExperienceSection.propTypes = {

}

export default ExperienceSection;


