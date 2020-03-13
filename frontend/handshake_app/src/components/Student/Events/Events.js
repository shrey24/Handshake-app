import React, { Component } from 'react'
import { ListGroup, Button, Label, Form, FormGroup, Container, Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import axios from 'axios';
import Spinner from '../../Spinner';
import NavBar from '../../NavBar';
import Avatar from 'react-avatar';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            rsvp : [],
            edit: true,
            event_id: null,
            applied: false
        }

    }

    componentDidMount() {        
        axios.get('/events/all')
        .then((res) => {
            console.log('events fetched', res.data);
            this.setState({data: [...res.data] })
        })
        .catch(err => {
            console.log(err);
            this.props.setAlert('Error, unable to fetch event postings', 'danger');
        });
        
    }

    render() {
        if(this.state.data.length === 0) {
            return <Spinner />;
        }
        console.log(this.state);

        return (
        <div>
            <NavBar />
          <br />
          <Container>
          <ListGroup>
            Events:
          {
            this.state.data.map((item) => {
                        return (
                        <ListGroup.Item action onClick={this.onClicked}>
                        <Row>
                        <Col sm={2}>
                        <Avatar 
                            name={item.company_name} 
                            src={item.company_avatar} /> 
                        </Col>
                        <Col>
                        <Link to={`/event/${item.id}`}> {item.event_name} </Link>
                        <br />
                    Open for {item.event_major || 'all majors'}
                    <br />
                    {item.date_time}
                        </Col>
                        </Row>
                           
                        </ListGroup.Item>
                        )
                    })
        }
        </ListGroup>
        </Container>

        {/* <Card>
            <Card.Body>
                <Row>
                <Col sm={8}>
                <Container>
        <Card.Title> {event_name} </Card.Title>
        <Card.Title> hosted by: {company_name} </Card.Title>
        <Card.Subtitle> Event on {date_time}</Card.Subtitle>
        <Card.Subtitle> Open for {event_major || 'All majors'}</Card.Subtitle>
            <Card.Text>{desc}</Card.Text>
                </Container>
                </Col>

                <Col sm={4}>
                <ListGroup>
                {addBtn}
                RSVP List
                {  
                    this.state.rsvp.map((item) => {
                        return (
                        <ListGroup.Item action onClick={this.onClicked}>
                           <ListGroup.Img src={item.student_avatar} /> 
                           {item.student_name} 
                        </ListGroup.Item>
                        )
                    })
                }

                </ListGroup>

                </Col>
                </Row>
            
            </Card.Body>
        </Card> */}
               
        </div>
        )
    }
}

Event.propTypes = {
    user: propTypes.object.isRequired,
    profile: propTypes.array.isRequired,
    setAlert: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.company.profile
});
export default connect(mapStateToProps, {setAlert})(Event);