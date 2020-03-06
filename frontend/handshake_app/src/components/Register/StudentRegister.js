import React, { useState } from 'react'
import axios from 'axios';
import { registerStudent } from '../../api/api';
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, CardText } from 'reactstrap';

const StudentRegister = () => {

    const [stdFormData, setStdFormData] = useState({
        email: '',
        password: '',
        name: '',
        curr_university: '',
        curr_degree: '',
        curr_major: '',
        edu_end: '',
        gpa: '',
    });

    const handleInput = e => {
        let val = e.target.value;
        if(e.target.type === 'number') {
            val = Number(e.target.value);
        } 
        setStdFormData({...stdFormData, [e.target.name]: val});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('send data to /student: ', stdFormData);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post('/register/student', 
                JSON.stringify(stdFormData),
                config
            );
            if (!res.data.error) {
                console.log("User Created!! ", res);
            } else {
                console.log(res.data.error);
            }
            
        } catch (error) {
            console.log(error);                        
        }

        // const token = res.data.token;
        //             console.log("TOKEN: ", token);
        //             localStorage.setItem('jwtToken', token);
    }

    return (
        <div>
        <Container>
            <h3> Student Registration </h3>
        <Form onSubmit={e => onSubmit(e)}>
        <FormGroup>
        <Label for="curr_university">University:</Label>
            <Input 
                onChange={handleInput}
                name="curr_university"
                value = {stdFormData.curr_university}
                type="text"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="curr_degree">Degree:</Label>
            <Input 
                onChange={handleInput}
                name="curr_degree"
                value = {stdFormData.curr_degree}
                type="text"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="curr_major">Major:</Label>
            <Input 
                onChange={handleInput}
                name="curr_major"
                value = {stdFormData.curr_major}
                type="text"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="edu_end">Graduation Year:</Label>
            <Input 
                onChange={handleInput}
                name="edu_end"
                value = {stdFormData.edu_end}
                type="number"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="gpa">GPA:</Label>
            <Input 
                onChange={handleInput}
                name="gpa"
                value = {stdFormData.gpa}
                type="number"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="name">Name:</Label>
            <Input 
                onChange={handleInput}
                name="name"
                value = {stdFormData.name}
                type="text"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="email">Email (user name):</Label>
            <Input 
                onChange={handleInput}
                name="email"
                value = {stdFormData.email}
                type="email"
                required
            />
        </FormGroup>
        <FormGroup>
        <Label for="password">Password:</Label>
            <Input 
                onChange={handleInput}
                name="password"
                value = {stdFormData.password}
                type="password"
                required
            />
        </FormGroup>

        <Row>
        <Col>
        <Button onClick={(e) => onSubmit(e)} >Create account</Button>
        </Col>
        </Row>
        
        </Form> 
        </Container>   
        </div>
    );
}

export default StudentRegister;
