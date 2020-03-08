import React, { Component } from 'react';
import NavBar from '../../NavBar';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import ProfileSection from './ProfileSection';
import { Container, Row, Col, Jumbotron, Card, CardBody } from 'reactstrap';

import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { getStudentProfile } from '../../../actions/studentProfile';

import propTypes from 'prop-types';
import AlertComp from '../../AlertComp';

class StudentProfile extends Component {

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
        console.log(`student profile: getStudentProfile(${this.props.user.user_id})`);
        getStudentProfile(this.props.user.user_id);
        if(this.props.studentProfile) {
            const { career_objective, ...profile_data} = this.props.studentProfile.student_profile[0];
            this.setState({
                career_objective,
                profile_data                
            });
        }   
    }

    render() {

        if(!this.props.user) {
            return <Redirect to='/login' />;
        }
        
        return (
            <div>
                <NavBar />

                <Container>
                    <Row>
                        <Col sm={4}>
                            <ProfileSection data = { this.state.profile_data }/>  
                        </Col>
                        <Col sm={8}>
                        <Container>
                            <Card>
                                <CardBody>     
                                <h3>Objective</h3>
                               {this.state.career_objective}
                                </CardBody>
                            </Card>                
                            <br/>
                            <EducationSection data = { this.state.student_education }/>
                            <br />
                            <ExperienceSection data = { this.state.student_experience }/>
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
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    studentProfile : state.studentProfile
});

export default connect(mapStateToProps, { getStudentProfile } )(StudentProfile);
