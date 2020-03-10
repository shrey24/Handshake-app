import React, { useState } from 'react'
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import { setAlert } from '../../../actions/alert';
import AlertComp from '../../AlertComp';
import AddJobForm from './AddJobForm';
import Navbar from '../../NavBar';


const Jobs = (props) => {
    return (
        <div>
            <Navbar />
            <h3> Jobs page</h3>
            <AddJobForm />
            
        </div>
    );
};

export default Jobs;
