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

    handleInput = (e) => {
        this.setState({
            ...this.state,
            data: {[e.target.name] : e.target.value}
        });  
    }

    newMessage = (e) => { 
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
            
                <Button color='primary' onClick={(e) => this.newMessage()}>
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
    student_profile: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    getStudentProfile: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    student_profile : state.studentProfile.student_profile
});

export default connect(mapStateToProps, {getStudentProfile})(ProfileSection);