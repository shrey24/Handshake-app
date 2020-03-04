import React, { Component } from 'react'
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, CardText } from 'reactstrap';


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
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
        if(this.props.item) {
            this.setState({isEditMode:true, ...this.props.item});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const {isEditMode, ...eduData } = this.state;
        if(isEditMode) {
            console.log("EducationForm call API/UPDATE: ", eduData);
            this.props.updateItem(eduData);
            this.props.showForm(false);

        } else {
            console.log("EducationForm call API/ADD: ", eduData);
            this.props.addNewItem(eduData);
            this.props.showForm(false);
        }        
    }
    
    onCancel(e) {
        this.props.showForm(false);
    }

    onDelete(e) {
        this.props.deleteItem(this.props.item);
        console.log("calling prop onDelete");
    }

    handleInput(e) {
        this.setState({[e.target.name] : e.target.value});  
    }



    

    render() {  
        // let {id, ...fields} = this.state;
        let header = null, deleteBtn=null;
        if(!this.state.isEditMode) header =  <h5> Add a new Education </h5>;
        else deleteBtn = <Button onClick={(e) => this.onDelete(e)} >Delete</Button>;
        
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
                <Col>
                { deleteBtn }
                </Col>
                </Row>
                
                
                </Form> 
                </Container>
                
            </div>
        )
    }
}
