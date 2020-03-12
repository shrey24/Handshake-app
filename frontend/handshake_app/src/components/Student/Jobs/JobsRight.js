import React, { Component } from 'react';
import {Card, Row, Col, Container, Modal, Button} from 'react-bootstrap';
import axios from 'axios';

export default class JobsRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            file: null
        }
    }

    onChange = (e) => {
        this.setState({file:e.target.files[0]});
    }

    onApply = (e) => {
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
    //     axios.post("/upload",formData,config)
    //         .then((response) => {
    //             alert("The file is successfully uploaded");
    //         }).catch((error) => {
    //         });
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
        return (
            // <div 
            // className="tab-pane fade show active" 
            // id={data.id} role="tabpanel"
            // aria-labelledby="v-pills-job-tab">

            <Container>

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
                        <button type="button" 
                        class="btn btn-success mar-btm"
                        onClick = {this.showModal}>
                            Apply
                        </button>
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
            <Button variant="success" onClick={this.handleClose}>
                Submit Application
            </Button>
            </Modal.Footer>
        </Modal>
            </Container>
            // </div>
        )
    }
}
