import React, { Component } from 'react'
import NavBar from '../NavBar'
import EducationSection from './EducationSection'
import { Container, Row, Col, Jumbotron } from 'reactstrap';

class StudentProfile extends Component {

    constructor(props){
        super(props);
    }
    
    render() {
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
                        <Row>
                            <Jumbotron>
                               
                            </Jumbotron>
                        </Row> 
                            <Row>
                                <EducationSection />
                            </Row> 
                            <Row>
                                <EducationSection />
                            </Row> 
                        </Col>
                    </Row>
                </Container>                
            </div>
        )
    }
}

export default StudentProfile;
