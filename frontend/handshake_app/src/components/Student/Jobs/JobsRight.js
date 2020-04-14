import React, { Component } from 'react';
import {Card, Row, Col, Container, Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import AlertComp from '../../AlertComp';
import { setAlert } from '../../../actions/alert';
import { getStudentProfile } from '../../../actions/studentProfile';

class JobsRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            file: null,
            applied: false
        }
    }

    componentDidMount() {
        this.props.getStudentProfile();
    }

    onChange = (e) => {
        this.setState({file:e.target.files[0]});
    }
    // { job_id, company_id, app_date, student_resume, ...studentProfile}
    onApply = (e) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        const app_date = yyyy + '-' + mm + '-' + dd;

        const formData = new FormData();
        const {data} = this.props;
        formData.append('job_id', data._id);
        formData.append('company_id', data.company_id);
        formData.append('app_date', app_date);
        const { 
            name, 
            curr_university,
            curr_major,
            curr_degree,
            phone,
            edu_start,
            avatar_path,
            email
         } = this.props.studentProfile[0];

        console.log(

        )
        formData.append('name', name);
        formData.append('curr_university', curr_university);
        curr_degree && formData.append('curr_degree', curr_degree);
        curr_major && formData.append('curr_major', curr_major);
        phone && formData.append('phone', phone);
        edu_start && formData.append('edu_start', edu_start);
        avatar_path && formData.append('avatar_path', avatar_path);
        formData.append('email', email);
        formData.append('file', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/jobs/apply", formData, config)
            .then((res) => {
                console.log('file upload success', res);
                this.handleClose();
                this.props.setAlert('Application Submitted!', 'success');
                this.setState({applied: true});
            }).catch((error) => {
                console.log(error);                
            });
    }

    showModal = (e) => {
        this.setState({show: true});
    }

    handleClose = (e) => {
        this.setState({show: false});
    }

    render() {
        const {data} = this.props;
        console.log('right pane data:', data);
        console.log('profile: ', this.props.studentProfile);
        return (
            // <div 
            // className="tab-pane fade show active" 
            // id={data.id} role="tabpanel"
            // aria-labelledby="v-pills-job-tab">

            <Container>
            <AlertComp />
            <div className="container-fluid pad-all">
                <h2 className="font-weight-bold">{data.job_title}</h2>
                <h3 className="font-weight-normal">{data.company_name}</h3>
                <div className="row pad-all">

                <p className="font-weight-light text-secondary mar-rt">
                    {data.job_catagory}
                    {'  -  '}
                    {data.job_location}
                    {'  -  '}
                    {'posted on '+data.post_date}
                </p>
                </div>
                <br />

                <Card>       
                    <Card.Body>
                    <Row >
                        <Col sm={10}>
                        <h5>
                        Applications close on: { data.deadline || 'N/A' }
                        </h5>
                        </Col>
                        <Col sm={2}>
                            {

                            !this.state.applied ?
                                <button type="button" 
                                class="btn btn-success mar-btm"
                                onClick = {this.showModal}>
                                    Apply
                                </button> :
                                <button type="button" 
                                class="btn btn-primary mar-btm"
                                >
                                Applied
                                </button> 

                            }
                        </Col>
                    </Row> 
                    </Card.Body>               
                </Card>
                <br />
                <br />
                <h3 className="font-weight-bold">Job Description</h3>
                <p className="font-weight-light">
                    {data.job_desc}
                </p>
            </div>

            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
        <Modal.Title>Apply to {data.company_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Applying for {data.job_title} requires a resume.
            Attach it below and get one step closer to your next job!
            <br /> <br /> 
            
            Upload New Resume
            <input type="file" name="myImage" onChange= {this.onChange} style= {{all:'inherit'}}/>
            
            

            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={this.onApply}>
                Submit Application
            </Button>
            </Modal.Footer>
        </Modal>
            </Container>
            // </div>
        )
    }
}

JobsRight.propTypes = {
    setAlert : propTypes.func.isRequired,
    getStudentProfile: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    studentProfile : state.studentProfile.student_profile
});

export default connect(mapStateToProps, { setAlert, getStudentProfile })(JobsRight);
