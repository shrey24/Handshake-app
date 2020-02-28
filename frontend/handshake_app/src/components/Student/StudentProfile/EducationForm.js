import React, { Component } from 'react'
import { Button, Label, Form, FormGroup, Input, Container, Col, Row } from 'reactstrap';


export default class EducationForm extends Component {
    constructor(props){
        super(props);
        this.state= {
                isEditMode: false,
                id : null,
                college_name: "",
                degree: "",
                major: "",
                start_date: null,
                end_date: null,
                gpa: null
            }
        
        this.handleInput = this.handleInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("EducationForm call API/update: ", this.state);
        this.props.setAddNew(false);
    }
    
    onCancel(e) {
        this.props.setAddNew(false);
    }
    handleInput(e) {
        this.setState({[e.target.name] : e.target.value});  
    }
    componentDidMount(){
        if(this.props.item) {
            this.setState({isEditMode:true, ...this.props.item});
        }
    }

    render() {  
        // let {id, ...fields} = this.state;
        let header = null;
        if(!this.state.isEditMode) header =  <h5> Add a new Education </h5>;
        return (
            
            <div>
                <Container>

                { header }
                <Form onSubmit={this.onSubmit}>
                <FormGroup>
                <Label for="college_name">University:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="college_name"
                        value = {this.state.college_name}
                        type="text"
                        required
                    />
                </FormGroup>
                <FormGroup>
                <Label for="degree">Degree:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="degree"
                        value = {this.state.degree}
                        type="text"
                        required
                    />
                </FormGroup>
                <FormGroup>
                <Label for="major">Major:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="major"
                        value = {this.state.major}
                        type="text"
                        required
                    />
                </FormGroup>
                <FormGroup>
                <Label for="start_date">Start:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="start_date"
                        value = {this.state.start_date}
                        type="number"
                        required
                    />
                </FormGroup>
                <FormGroup>
                <Label for="end_date">End:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="end_date"
                        value = {this.state.end_date}
                        type="number"
                        required
                    />
                </FormGroup>
                <FormGroup>
                <Label for="gpa">GPA:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="gpa"
                        value = {this.state.gpa}
                        type="number"
                        required
                    />
                </FormGroup>
                <Row>
                <Col>
                <Button onClick={(e) => this.onSubmit(e)} >Submit</Button>
                </Col>
                <Col>
                <Button onClick={(e) => this.onCancel(e)} >Cancel</Button>
                </Col>
                </Row>
               
                
                
                </Form> 
                </Container>
            </div>
        )
    }
}
