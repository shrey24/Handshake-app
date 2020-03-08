import React, { Component } from 'react';
import Avatar from 'react-avatar';
import { Container,
        Button,
        Col,
        Input,
        Label,
        Form,
        FormGroup,
        Row, 
        Card,
        CardText,
        CardBody, 
        CardTitle,
        CardSubtitle        
    } from 'reactstrap';

class ProfileSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
        }
    }

    componentDidMount(){
        this.setState({...this.props.data});
    }

    handleEdit = () => {
        this.setState({editMode:true});
    }

    handleInput = (e) => {
        this.setState({[e.target.name] : e.target.value});  
    }

    onSubmit = (e) => {
        const {editMode, ...data} = this.state;
        console.log("API Call to update/profile : ", data);
        this.setState({editMode:false});
    }

    onCancel = (e) => {
        this.setState({editMode: false});
    }

    // email phone name dob curr_university curr_major edu_end avatar_path resume_path
    render() {

        const fieldNames = {
            "dob": 'birth date',
            "address_city": '',
            "address_state": '',
            "address_country": '',
            "curr_university": '',
            "curr_degree": '',
            "curr_major": '',
            "edu_start": 'From: ',
            "edu_end": ' To: ',
            "gpa": 'GPA',
        }
        console.log(this.props);
        const { data } = this.props;
        const { name, 
                curr_major,
                curr_degree,
                curr_university, 
                avatar_path, 
                resume_path, ...info} = data;

        if(this.state.editMode) { // render form
            return (
                <div>
                <Container>
                <Card style={{ width: '18rem' }}>
                <CardBody className="text-center"></CardBody>
                <Avatar 
                    name={name}
                    round={true}
                />

                <Form onSubmit={this.onSubmit}>
                <FormGroup>
                <Label for="name">Name:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="name"
                        value = {this.state['name']}
                        type="text"
                        required
                    />
                </FormGroup>
                <FormGroup>
                <Label for="edu_end">End date:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="edu_end"
                        value = {this.state['edu_end']}
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

                </Card>
                </Container>
                </div>
            );

        } else { // render data
            return (
                <div>
                <Container>
                <Card style={{ width: '18rem' }}>
                <CardBody className="text-center">
                    <Avatar 
                    name={name}
                    round={true} 
                    />
                    <CardTitle><h5>{name} </h5></CardTitle>
                    <CardSubtitle>{curr_university}</CardSubtitle>
                    <CardSubtitle>{curr_degree} - {curr_major}</CardSubtitle>
                   
                    {
                        Object.keys(info).map((key, index) => {
                            return (<CardText> {fieldNames[key]} {info[key]} </CardText>)
                        })
                    }
                
                    <Button onClick={(e) => this.handleEdit()}>
                        Edit
                    </Button>

                </CardBody>
                </Card>
                </Container>
                </div>   
            );
        }
        
    }
}

export default ProfileSection;