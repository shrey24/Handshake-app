import React, { Component } from 'react'
import NavBar from '../NavBar'
import EducationSection from './EducationSection'
import { Container, Row, Col, Jumbotron } from 'reactstrap';

class StudentProfile extends Component {

    constructor(props){
        super(props);

    }

    render() {
        const career_objective = "Gain experinece and progress with new skills";
        return (
            <div>
                <NavBar />
                <h1> Student Profile </h1>
                <Container>
                    <Row>
                        <Col>
                            <h2>Profile Pic</h2>
                        </Col>
                        <Col>
                        
                            <Jumbotron>
                                <h3>Objective</h3>
                               {career_objective}
                            </Jumbotron>
                            <EducationSection />                            
                        </Col>
                    </Row>
                </Container>                
            </div>
        )
    }
}

export default StudentProfile;
