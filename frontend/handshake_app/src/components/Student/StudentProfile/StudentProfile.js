import React, { Component } from 'react';
import NavBar from '../../NavBar';
import EducationSection from './EducationSection';
import ProfileSection from './ProfileSection';
import { Container, Row, Col, Jumbotron, Card, CardBody } from 'reactstrap';

class StudentProfile extends Component {

    constructor(props){
        super(props);

    }

    render() {
        const career_objective = "Gain experinece and progress with new skills";
        const prof = {
            name: "Shrey Patel",
            curr_major : "CMPE",
            
            edu_end :2020
        };

        return (
            
            <div>
                <NavBar />
                <Container>
                    <Row>
                        <Col sm={4}>
                            <ProfileSection data = { prof }/>
                        </Col>
                        <Col sm={8}>
                        <Container>
                            <Card>
                                <CardBody>
                                
                                <h3>Objective</h3>
                               {career_objective}
                                
                                </CardBody>
                            
                            </Card>
                       
                            <EducationSection />   
                        </Container>
                                                    
                        </Col>
                    </Row>
                </Container>                
            </div>
        )
    }
}

export default StudentProfile;
