import React, { Component } from 'react';
import NavBar from '../../NavBar';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import ProfileSection from './ProfileSection';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { getStudents } from '../../../actions/studentProfile';

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
        if(!this.props.students){
            this.props.getStudents();              
        }
    }

    render() {
        if(!this.props.user)
            return <Redirect to='/login' />;
        
        if(!this.props.students) 
            return <Spinner />;
        console.log('view profile', this.props.students);
        const { studentId } = this.props.match.params;
        let studentProfile = this.props.students.find(item => item._id === studentId);
        if (!studentProfile) {
            return (
            <div>
                <NavBar />
                <Container> <h3>{`Error, studentID ${studentId} not found`}</h3>
                </Container>
            </div>
            )
        }

        console.log('rendering studentprofile', studentProfile);
        
        const {student_profile, student_education, student_experience} = studentProfile;
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

StudentProfileViewPage.propTypes = {
    getStudents: propTypes.func.isRequired,
    studentProfile: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    studentId: propTypes.string.isRequired,
    students: propTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    students : state.studentProfile.students
});

export default connect(mapStateToProps, { getStudents } )(StudentProfileViewPage);
