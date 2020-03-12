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
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getStudentProfile } from '../../../actions/studentProfile';
import propTypes from 'prop-types'
import Spinner from '../../Spinner';
import axios from 'axios';


class ProfileSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:null,
            editMode: false,
            showAvatarModal : false,
            file: null,
        }
    }

    componentDidMount(){
        this.setState({
            data: {...this.props.student_profile[0]}
        });  
    }

    handleEdit = () => {
        this.setState({editMode:true});
    }

    handleInput = (e) => {
        this.setState({
            ...this.state,
            data: {[e.target.name] : e.target.value}
        });  
    }

    onSubmit = (e) => { 
        const { data } = this.state;
        console.log("API Call to update/profile : ", data);
        axios.put('/student-profile', data)
            .then(res => {
                console.log('prifile updated', res);
                this.props.getStudentProfile();
            })
            .catch(err => {
                console.log('update student-profile err: ', err);
                
            });
        this.setState({editMode:false});
    }

    uploadFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userAvatar', this.state.file);
        axios.put('/student-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log('file upload success', res);
            this.onCancelAvatarModal();
            this.props.getStudentProfile();
        })
        .catch(err => {
            console.log('file upload error', err);
        });
    }

    onChangeAvatar = (e) => {
        this.setState({file: e.target.files[0]});
    }

    onCancelAvatarModal = (e) => {
        this.setState({showAvatarModal: false});
    }

    onCancel = (e) => {
        this.setState({editMode: false});
    }

    // email phone name dob curr_university curr_major edu_end avatar_path resume_path
    render() {
        if (!this.props.student_profile){
            return <Spinner />;
        }

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
        const { user_id,
                name, 
                curr_major,
                curr_degree,
                curr_university, 
                avatar_path, 
                resume_path, ...info} = this.props.student_profile[0];

        const modal = (
            <Modal show={this.state.showAvatarModal} onHide={this.onCancelAvatarModal}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <br /> <br /> 
            Upload a new profile picture
            <Form onSubmit={this.uploadFile}>
            <input 
            type="file" 
            name="userAvatar" 
            onChange= {this.onChangeAvatar} 
            />
            
            <Modal.Footer>
            <Button type='submit' color="success">
                Upload
            </Button>
            </Modal.Footer>
            </Form>
            </Modal.Body>
            </Modal>
        );


        if(this.state.editMode) { // render form
            return (
                <div>
                {modal}
                <Container>
                <Card style={{ width: '18rem' }}>
                <CardBody className="text-center"></CardBody>
                <Avatar 
                    name={name}
                    round={true}
                    src={avatar_path}
                />

                <Form onSubmit={this.onSubmit}>
                <FormGroup>
                <Label for="name">Name:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="name"
                        value = {this.state.data['name']}
                        type="text"
                        required
                    />
                </FormGroup>
                <FormGroup>
                <Label for="edu_end">End date:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="edu_end"
                        value = {this.state.data['edu_end']}
                        type="number"
                        required
                    />
                </FormGroup>
                <FormGroup>
                <Label for="gpa">GPA:</Label>
                    <Input 
                        onChange={this.handleInput}
                        name="gpa"
                        value = {this.state.data.gpa}
                        type="number"
                        required
                    />
                </FormGroup>
                <Row>
                <Col>
                <Button color='success' onClick={(e) => this.onSubmit(e)} >Submit</Button>
                </Col>
                <Col>
                <Button color='secondary' onClick={(e) => this.onCancel(e)} >Cancel</Button>
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
                {modal}
                <Card style={{ width: '18rem' }}>
                <CardBody className="text-center">
                    <Avatar 
                    name={name}
                    round={true} 
                    src = {avatar_path}
                    onClick = { (e) => this.setState({showAvatarModal: true})}
                    />

                    <CardTitle><h5>{name} </h5></CardTitle>
                    <CardSubtitle>{curr_university}</CardSubtitle>
                    <CardSubtitle>{curr_degree} - {curr_major}</CardSubtitle>
                   
                    {
                        Object.keys(info).map((k, index) => {
                            return (<CardText> {fieldNames[k]} {info[k]} </CardText>)
                        })
                    }
                
                    <Button color='link' onClick={(e) => this.handleEdit()}>
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
ProfileSection.propType = {
    student_profile: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    getStudentProfile: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    student_profile : state.studentProfile.student_profile
});

export default connect(mapStateToProps, {getStudentProfile})(ProfileSection);