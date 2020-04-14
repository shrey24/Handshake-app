import React, { Component } from 'react';
import NavBar from '../../NavBar';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import ProfileSection from './ProfileSection';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { getStudentProfile } from '../../../actions/studentProfile';

import propTypes from 'prop-types';
import AlertComp from '../../AlertComp';
import Spinner from '../../Spinner';

class StudentProfileViewPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            student_profile:[],
            student_education:[],
            student_experience:[],
            profile_data : null,
            career_objective : null
        }
    }

    componentDidMount() {
        if(this.props.user){
            console.log(`student profile: getStudentProfile(${this.props.user.user_id})`);
            this.props.getStudentProfile(this.props.user.user_id);  
        }
    }

    render() {
        if(!this.props.user) {
            return <Redirect to='/login' />;
        }

        if(this.props.studentProfile.loading)
        return <Spinner />;
        
        console.log('rendering studentprofile', this.props.studentProfile);
        
        const {student_profile, student_education, student_experience} = this.props.studentProfile;
        console.log('student_profile ', typeof student_profile);
        console.log('student_education ', typeof student_education);
        console.log('student_experience ', typeof student_experience);
        
        return (
            <div>
                <NavBar />

                <Container>
                    <Row>
                        <Col sm={4}>
                            <ProfileSection />  
                        </Col>
                        <Col sm={8}>
                        <Container>
                            <Card>
                                <CardBody>     
                                <h3>Objective</h3>
                               {student_profile[0].career_objective}
                                </CardBody>
                            </Card>                
                            <br/>
                            <EducationSection 
                            data = { student_education }/>
                            <br />
                            <ExperienceSection 
                            data = { student_experience }/>
                        </Container>                            
                        </Col>
                    </Row>
                </Container>                
            </div>
        );
    }
}

StudentProfile.propTypes = {
    getStudentProfile: propTypes.func.isRequired,
    studentProfile: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    studentId: propTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    studentProfile : state.studentProfile
});

export default connect(mapStateToProps, { getStudentProfile } )(StudentProfileViewPage);
