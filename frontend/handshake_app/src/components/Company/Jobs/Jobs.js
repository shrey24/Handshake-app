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


class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addJob: false,
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
                                    posted on {item.post_date}
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

                                <Button variant='primary' >
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
    profile: propTypes.array.isRequired,
    getCompanyProfile: propTypes.func.isRequired,
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.company.profile
});
export default connect(mapStateToProps, { getCompanyProfile, setAlert })(Jobs);
