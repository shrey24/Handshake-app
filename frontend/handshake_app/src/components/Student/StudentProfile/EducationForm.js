import React, { Component } from 'react'
import { Button, Card, Label, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

export default class EducationForm extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                <h4> Add a new Education </h4>
            <FormGroup>
            <Label for="inpEmail">Email</Label>
            <Input 
                onChange={this.handleInput}
            type="email" name="email" id="inpEmail" placeholder="Email id" 
            />
            </FormGroup>
            <FormGroup>
            <Label for="password">Password</Label>
            <Input 
                onChange={this.handleInput}
            type="password" name="password" id="password" placeholder="password" />
            </FormGroup>
            <Button>Submit</Button>
            </Form> 
                
            </div>
        )
    }
}
