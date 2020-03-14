import React, { Component } from 'react'
import { Modal, Button, Form, FormGroup, Container, Col, Row, Card } from 'react-bootstrap';
import {Label, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getCompanyProfile } from '../../../actions/company';
import handshakeImage from '../../images/handshake.png';
import propTypes from 'prop-types';
import axios from 'axios';
import Spinner from '../../Spinner';
import NavBar from '../../NavBar';
import AlertComp from '../../AlertComp';

class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            onEdit: false,
            showAvatarModal : false,
            file: null,
            data: {
                name: '', 
                location: '', 
                company_desc: '', 
                email: '', 
                phone: '', 
                website: '', 
                avatar_path: ''
            }
        }

    }

    componentDidMount() {
        if(!this.props.loading) {
            this.setState({
                ...this.state,
                data: {
                    ...this.state.data,
                    ...this.props.profile[0]
                }
            
            });
        } else {
            this.props.getCompanyProfile();
        }
    }

    onEdit = (e) => {
        this.setState({onEdit: !this.state.onEdit});
    }

    onUpdate = (e) => {
        const { data } = this.state;
        console.log("API Call to update/profile : ", data);
        axios.put('/company/profile', data)
            .then(res => {
                console.log('prifile updated', res);
                this.props.getCompanyProfile();
            })
            .catch(err => {
                console.log('update company-profile err: ', err);
            });
        this.setState({onEdit:false});
    }

    handleInput = (e) => {
        this.setState({
            ...this.state,
            data: {[e.target.name]: e.target.value}
            });
    }

    uploadFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userAvatar', this.state.file);
        axios.put('/company/profile', formData, {
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

    render() {
        console.log('state:', this.state);
        console.log('props.profile:', this.props.profile);
        
        if(this.props.loading) {
            return <Spinner />;
        }

        let editBtn = null;
        if(this.props.user) {
            if(this.props.user.user_type === 'company') {
                editBtn = <Button variant='success' onClick={this.onEdit}> Edit Profile</Button> ;
            }
        }
        
        
        const {name, location, company_desc, email, phone, website, avatar_path} = this.props.profile[0];

        const display_profile = (
            <div>
            <Card >
                <Container>
            <img src={avatar_path || handshakeImage} 
            onClick = { (e) => this.setState({showAvatarModal: true})}/>
            </Container>
            <Card.Body>
                
            <Container>
                <Row>
                <Col sm={10}>
                <Card.Title> {name} </Card.Title>
                </Col>
                <Col sm={2}>
                    {editBtn}
                </Col>
                </Row>
            
            <Card.Subtitle> {location}</Card.Subtitle>
            <Card.Subtitle> {email}</Card.Subtitle>
            <Card.Subtitle> {phone}</Card.Subtitle>
            <Card.Subtitle> {website}</Card.Subtitle>
                <Card.Text>{company_desc}</Card.Text>
            </Container>
            </Card.Body>
        </Card>
        </div>
        );

        const editForm = (
            <div>
            <Container>
                <h3> Update Profile </h3>
                <AlertComp />

            <Form >
            <FormGroup>
            <Label for="name">Company Name:</Label>
                <Input 
                    onChange={this.handleInput}
                    name="name"
                    value = {this.state.data.name}
                    type="text"
                    required
                />
            </FormGroup>
            <FormGroup>
            <Label for="location">Location:</Label>
                <Input 
                    onChange={this.handleInput}
                    name="location"
                    value = {this.state.data.location}
                    type="text"
                    required
                />
            </FormGroup>
            <FormGroup>
            <Label for="company_desc">description:</Label>
                <Input 
                    onChange={this.handleInput}
                    name="company_desc"
                    value = {this.state.data.company_desc}
                    type="text"
                    required
                />
            </FormGroup>
            <FormGroup>
            <Label for="phone">Phone:</Label>
                <Input 
                    onChange={this.handleInput}
                    name="phone"
                    value = {this.state.data.phone}
                    type="text"
                    required
                />
            </FormGroup>
            <FormGroup>
            <Label for="website">website url:</Label>
                <Input 
                    onChange={this.handleInput}
                    name="website"
                    value = {this.state.data.website}
                    type="text"
                    required
                />
            </FormGroup>
            <Row>
            <Col>
            <Button onClick={this.onUpdate} >Update Profile</Button>
            </Col>
            <Col>
            <Button onClick={this.onEdit} >Cancel</Button>
            </Col>
            </Row>
            
            </Form> 
            </Container>
            </div>
        )

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

        let comp = null;
        if (!this.state.onEdit) {
            comp = display_profile;
        } else {
            comp = editForm;
        }
         
        return (
        <div>
            {modal}
            <NavBar />
          <br />
                {comp}
            
               
        </div>
        )
    }
}

Event.propTypes = {
    user: propTypes.object.isRequired,
    profile: propTypes.array.isRequired,
    loading: propTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    getCompanyProfile: propTypes.func.isRequired,
    user: state.auth.user,
    profile: state.company.profile,
    loading: state.company.loading
});
export default connect(mapStateToProps, { getCompanyProfile })(CompanyProfile);