import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import Avatar from 'react-avatar';
import NavBar from '../NavBar';
import { connect } from 'react-redux';
import propTypes from 'prop-types';


const Students = (props) => {

    const [studentList, setStudentList] = useState([]);
    const [showList, setShowList] = useState([]);
    
    useEffect(() => {

    }, []);
    

    return (
       <div>
    <NavBar />
    <br />       
    <Container>
    <Row>
        {/* filter section */}
    <Col sm={3} >
        <Card body> 
        <Card.Title> Filters </Card.Title>
        < hr />
        <Form>
        <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter a name..." />
        </Form.Group>
        <Form.Group>
        <Form.Label>Schools</Form.Label>
        <Form.Control type="text" placeholder="university name..." />
        </Form.Group>
        <Form.Group>
        <Form.Label>Skillset</Form.Label>
        <Form.Control type="text" placeholder="Ex Java, Python, ..." />
        </Form.Group>
        </Form>
        </Card>
    </Col>

    {/* student list section */}
    <Col>
    {
        showList.map((item, index) => {
            return (
                <Container>
                <Card body>
                <Row className="show-grid">
                    
                <Col sm={2}>
                <Avatar
                name={item.name}
                round={true} 
                src = {item.avatar_path} 
                />
                </Col>

                <Col sm={7}>
                <Card.Title>
                {/* <Link to={{pathname:'/company/profile', user_id:'comp_id'}} > */}
                <Link to={`/students/${item._id}`}> {item.name} </Link>
                </Card.Title>
                
                <Card.Text> {item.curr_university}</Card.Text>
                <Card.Text> {item.curr_major}</Card.Text>
                <Card.Text> {item.curr_degree} | Graduates {item.edu_end}</Card.Text>
                </Col>

                </Row>
                </Card>
                <br />
                </Container>
            );
        })           
    
    }

    </Col>
    </Row>

    </Container>

    </div>
    )
}

export default Students;
