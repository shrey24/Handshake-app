import React, { Component } from 'react';
import NavBar from '../../NavBar';
import EducationSection from './EducationSection';
import ProfileSection from './ProfileSection';
import { Container, Row, Col, Jumbotron, Card, CardBody } from 'reactstrap';

import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import propTypes from 'prop-types';
import AlertComp from '../../AlertComp'

class StudentProfile extends Component {

    constructor(props){
        super(props);

    }

    render() {

        if(!this.props.isAuthenticated) {
            return <Redirect to='/login' />
        }

        const { student_profile, student_education, student_experience } = this.props.studentProfile;
        const { career_objective, ...profile_data} = student_profile[0];

        return (
            <div>
                <NavBar />

                <Container>
                    <Row>
                        <Col sm={4}>
                            <ProfileSection data = { profile_data }/>
                        </Col>
                        <Col sm={8}>
                        <Container>
                            <Card>
                                <CardBody>     
                                <h3>Objective</h3>
                               {career_objective}
                                </CardBody>
                            </Card>                
                            <br/>
                            <EducationSection data = { student_education }/>
                            <br />
                            <ExperienceSection data = { student_experience }/>
                        </Container>                            
                        </Col>
                    </Row>
                </Container>                
            </div>
        )
    }
}

StudentProfile.prototypes = {
    getStudentProfile: propTypes.func.isRequired,
    deleteStudentEducations: propTypes.func.isRequired,
    student: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    studentProfile : state.studentProfile
});

export default connect(mapStateToProps)(StudentProfile);
