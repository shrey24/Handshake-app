import React, { Component } from 'react';
import Avatar from 'react-avatar';
import { Container,
        Button,
        Col,
        Row, 
        Card,
        CardText,
        CardBody, 
        CardTitle,
        CardSubtitle        
    } from 'reactstrap';
import { Modal, Form, FormGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getStudentProfile } from '../../../actions/studentProfile';
import { sendMessage } from '../../../actions/messages';
import propTypes from 'prop-types'
import Spinner from '../../Spinner';
import axios from 'axios';


class ProfileSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:null,
            editMode: false,
            showMessageModal : false,
            file: null,
            messageText: ''
        }
    }

    componentDidMount(){
        this.setState({
            data: {...this.props.student_profile[0]}
        });
    }

    handleInput = (e) => {
        this.setState({
            ...this.state,
           [e.target.name] : e.target.value
        });  
    }

    sendMessage = (e) => { 
        // redirect to message tab
        e.preventDefault();
        const messageObject = {
            to_user_id: this.props.student_profile[0]._id, 
            to_user_name: this.props.student_profile[0].name, 
            to_avatar_path: this.props.student_profile[0].avatar_path, 
            from_user_name: this.props.user_profile.name, 
            from_avatar_path: this.props.user_profile.avatar_path, 
            content: this.state.messageText
        };
        this.props.sendMessage(messageObject);
        this.onCancelAvatarModal();
        this.props.alertMessageSent(`message sent to ${messageObject.to_user_name}`);
    }

    onCancelAvatarModal = (e) => {
        this.setState({showMessageModal: false});
    }

    onCancel = (e) => {
        this.setState({editMode: false});
    }

    // email phone name dob curr_university curr_major edu_end avatar_path resume_path
    render() {
        if (!this.props.student_profile){
            return <Spinner />;
        }
        console.log('profile Section props: ', this.props.student_profile);
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
            "email": 'email'
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
            <Modal 
            show={this.state.showMessageModal} 
            onHide={this.onCancelAvatarModal} >

            <Modal.Header closeButton>
            <Avatar 
            name={name}
            round={true} 
            src = {avatar_path}
            />
            <Modal.Title>{`Ask ${name} about...`}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <br /> 
            <br /> 
            <Form onSubmit={this.sendMessage}>
            <Form.Row>
            <FormGroup as={Col} sm={10} >
            <Form.Control
            onChange={this.handleInput}
            value={this.state.messageText}
            name= 'messageText'
            as="textarea" 
            rows="10"
            placeholder="Type a message..." />
            </FormGroup>
            </Form.Row>   

            <Modal.Footer>
            <Button variant="primary" type="submit">
                Send
            </Button>
            </Modal.Footer>
            </Form>
            </Modal.Body>
            </Modal>
        );

        return (
            <div>
            <Container>
            { modal }

            <Card style={{ width: '18rem' }}>
            <CardBody className="text-center">
                <Avatar 
                name={name}
                round={true} 
                src = {avatar_path}
                />

                <CardTitle><h5>{name} </h5></CardTitle>
                <CardSubtitle>{curr_university}</CardSubtitle>
                <CardSubtitle>{curr_degree} - {curr_major}</CardSubtitle>
                
                {
                    Object.keys(info).map((k, index) => {
                        if (k != '_id')
                            return (<CardText> {info[k] && `${fieldNames[k]} ${info[k]}`} </CardText>)
                    })
                }
            
                <Button 
                color='primary' 
                onClick={(e) => this.setState({showMessageModal: true})}>
                    Message
                </Button>

            </CardBody>
            </Card>
            </Container>
            </div>   
        );
    }
}

ProfileSection.propType = {
    student_profile: propTypes.array.isRequired,
    messageFromUser: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    getStudentProfile: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {getStudentProfile, sendMessage})(ProfileSection);