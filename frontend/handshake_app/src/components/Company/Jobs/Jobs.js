import React, { Component } from 'react';
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { setAlert } from '../../../actions/alert';
import { getCompanyProfile } from '../../../actions/company';
import AlertComp from '../../AlertComp';
import AddJobForm from './AddJobForm';
import Navbar from '../../NavBar';
import axios from 'axios';
import Applicants from './Applicants';


class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addJob: false,
            viewApplicationsFor : null,
            jobsList: []
        }
    }

    componentDidMount() {
        this.props.getCompanyProfile();
        // fetch this company posts
        axios.get('/company/jobs')
            .then((res) => {
                console.log('jobs fetched', res.data);
                this.setState({jobsList: [...res.data] })
            })
            .catch(err => {
                console.log(err);
                this.props.setAlert('Error, unable to fetch job postings', 'danger');
            });
    }

    handleAddJob = () => { // called onCancel form, when return back to list jobs
        this.setState({addJob: !this.state.addJob});
        axios.get('/company/jobs')
            .then((res) => {
                console.log('jobs fetched', res.data);
                this.setState({jobsList: [...res.data] })
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

        if(!this.state.addJob) {
            comp = (
                <div>
                <Button 
                variant='success' 
                onClick={(e) => this.handleAddJob()}>
                    Add a new opening
                </Button> 
                <h3> Current Job Openings: </h3>
                {
                    this.state.jobsList.map((item) => {
                        let post_date = new Date(Date(item.post_date));
                        return (
                            <Container>
                            <br />
                            <Card>

                            <Card.Header>
                                <Row className="show-grid">
                                    <Col sm={8}>
                                    {item.job_title} | job id: {item.id}
                                    </Col>
                                    <Col sm={4}>
                                    posted on {post_date.toDateString()}
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                               <Card.Text>
                                   {item.job_catagory} <br /> 
                                   {item.job_location} <br />
                                   deadline to apply: {item.deadline} <br />
                                   Salary offer: {item.salary} <br />
                               </Card.Text> 

                                <Button variant='primary' 
                                onClick = {(e) => this.handleAppView(item._id)}>
                                View Applicants
                                </Button>
                            </Card.Body>
                            
                            </Card>
                            </Container>
                        ) 
                    })
                }                   
                </div>
            )
        } else {
            comp = <AddJobForm onCancel = {this.handleAddJob}/>
        }

        if(this.state.viewApplicationsFor) {
            comp = <Applicants data = {{job_id : this.state.viewApplicationsFor}} />
        }

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


Jobs.propTypes = {
    setAlert : propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    profile: propTypes.object.isRequired,
    getCompanyProfile: propTypes.func.isRequired,
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.company.profile
});
export default connect(mapStateToProps, { getCompanyProfile, setAlert })(Jobs);
