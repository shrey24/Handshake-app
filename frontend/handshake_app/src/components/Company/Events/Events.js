import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { setAlert } from '../../../actions/alert';
import { getCompanyProfile } from '../../../actions/company';
import AlertComp from '../../AlertComp';
import EventForm from './EventForm';
import Navbar from '../../NavBar';
import axios from 'axios';


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addJob: false,
            viewApplicationsFor : null,
            eventsList: []
        }
    }

    componentDidMount() {
        this.props.getCompanyProfile();
        // fetch this events 
        axios.get('/events/all')
            .then((res) => {
                console.log('events fetched', res.data);
                this.setState({eventsList: [...res.data] })
            })
            .catch(err => {
                console.log(err);
                this.props.setAlert('Error, unable to fetch event postings', 'danger');
            });
    }

    handleAddJob = () => { // called onCancel form, when return back to list jobs
        this.setState({addJob: !this.state.addJob});
        axios.get('/events/all')
            .then((res) => {
                console.log('events fetched', res.data);
                this.setState({eventsList: [...res.data] })
            })
            .catch(err => {
                console.log(err);
                this.props.setAlert('Error, unable to fetch job postings', 'danger');
            });
    }

    handleAppView = (job_id) => {
        console.log('viewApplicationsFor changed, ', this.state.viewApplicationsFor);
        this.setState({viewApplicationsFor : job_id});
    }

    cancelAppView = () => {
        this.setState({viewApplicationsFor : null});
    }
    
    render() {
        let comp = null;
        console.log(this.state);
        
        if(!this.state.addJob) {
            comp = (
                <div>
                <Button 
                variant='success' 
                onClick={(e) => this.handleAddJob()}>
                    Create a new Event
                </Button> 
                <h3> Current Upcoming Events: </h3>
                {
                    this.state.eventsList.map((item) => {
                        return (
                            <Container>
                            <br />
                            <Card>

                            <Card.Header>
                                <Row className="show-grid">
                                    <Col sm={8}>
                                    {item.event_name} 
                                    </Col>
                                    <Col sm={4}>
                                    to be held on {item.date_time}
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                               <Card.Text>
                                   Majors Ristricted {item.event_major || 'All'} <br /> 
                                 <br />
                               </Card.Text> 

                                {/* <Button variant='primary' >
                                </Button> */}
                                    {/* style={{all: 'inherit'}} */}
                                    <Link 
                                    to={`/event/${item.id}`}>
                                View Applicants
                                </Link>
                                
                            </Card.Body>
                            
                            </Card>
                            </Container>
                        ) 
                    })
                }                   
                </div>
            )
        } else {
            comp = <EventForm onCancel = {this.handleAddJob}/>
        }

        // if(this.state.viewApplicationsFor) {
        //     return <Redirect to={{pathname:'/event', event_id:this.state.viewApplicationsFor}} />
        // }
        return (
            <div>
                <Navbar />
                <Container>
                    <br />
                <AlertComp />
                { comp }
                </Container>
            </div>
        );
    }
}


Events.propTypes = {
    setAlert : propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    profile: propTypes.array.isRequired,
    getCompanyProfile: propTypes.func.isRequired,
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.company.profile
});
export default connect(mapStateToProps, { getCompanyProfile, setAlert })(Events);
