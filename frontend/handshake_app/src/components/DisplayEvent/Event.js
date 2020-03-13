import React, { Component } from 'react'
import { ListGroup, Button, Label, Form, FormGroup, Container, Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import axios from 'axios';
import Spinner from '../Spinner';
import NavBar from '../NavBar';

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
        const { event_id } = this.props.match.params;
        console.log('event_id recev: ', event_id);
        axios.get(`/events/${event_id}`)
            .then(res => {
                console.log('fetch event data', res);                
                this.setState({data: [...res.data]});
            })
            .catch(err => {
                console.log('unable to fetch event data', err);                
            });
            
        axios.get(`/events/students/${event_id}`)
        .then(res => {
            console.log('fetch rsvp data', res);                
            this.setState({rsvp: [...res.data]});
        })
        .catch(err => {
            console.log('unable to fetch event data', err);                
        });
        
    }

    submitRsvp = (e) => {
        const { event_name, id } = this.state.data[0];
        const data = { 
            event_name,
            event_id: id,
            student_name: this.props.profile.name,
            student_avatar: this.props.profile.avatar_path
        }
        axios.post('/events/rsvp', data)
        .then( res => {
            this.setState({applied: true});
        })
        .catch( err => {
            console.log(err);            
        })
    }

    render() {
        if(this.state.data.length === 0) {
            return <Spinner />;
        }
        console.log(this.state);

        let addBtn = null;
        if(this.props.user) {
            if(this.props.user.user_type === 'student') {
                if(this.props.user.curr_major === this.state.data[0].event_major || !this.state.data[0].event_major)
                    addBtn = <Button variant='success' onClick={this.submitRsvp}> join Event </Button> ;
                else addBtn = <Button disabled variant='success' > Not Qualified to join </Button> ;
            }
        }
        if(this.state.applied) {
            addBtn = <Button disabled variant='success' > Registered </Button> ;
        }
        
        const {event_name, desc, event_major, company_name, company_avatar, date_time} = this.state.data[0];
        return (
        <div>
            <NavBar />
          <br />
        <Card>
            <Card.Img variant="top" src={company_avatar} />
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
                            <div>
                            {/* // <ListGroup.Item >
                            // <ListGroup.Img src={item.student_avatar} /> 
                         </ListGroup.Item> */}
                           {item.student_name} 
                           <br />
                        </div>
                        )
                    })
                }

                </ListGroup>

                </Col>
                </Row>
            
            </Card.Body>
        </Card>
               
        </div>
        )
    }
}

Event.propTypes = {
    user: propTypes.object.isRequired,
    profile: propTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.studentProfile.student_profile
});
export default connect(mapStateToProps)(Event);