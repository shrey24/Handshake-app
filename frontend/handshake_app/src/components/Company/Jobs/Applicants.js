import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Avatar from 'react-avatar';

import { connect } from 'react-redux';
import propTypes from 'prop-types';
import AlertComp from '../../AlertComp';
import { setAlert } from '../../../actions/alert';
import { APP_STATUS } from '../../../actions/types';
const server_url = 'ec2-34-208-245-62.us-west-2.compute.amazonaws.com:3001';

const Applicants = (props) => {
    const [studentList, setStudentList] = useState([]);
    
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    // update status
    const changeStatus = (id, new_status) => {
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        axios.put('/company/applications', {'id': id, 'app_status': new_status})
            .then(res => {
                const newList = studentList.map((s) => {
                    if (s.id === id) 
                        return Object.assign({}, s, {app_status:new_status});
                    else return Object.assign({}, s);
                });
                console.log('new updated applicant list', newList);
                setStudentList(newList);
            })
            .catch(err => {
                console.log('err on update app status ', err);
            });
    }

    useEffect(() => {
        if(props.data) { 
            axios.get(`/company/applications/${props.data.job_id}`)
                .then(res => {
                    console.log('applicants fetched: ', res);                    
                    setStudentList([...res.data]);
                })
                .catch(err => {
                    console.log(err);

                });
        }
    }, []);

    const pkj = JSON.parse(package);

    return (
        <Container>
        {
            studentList.map((item, index) => {
                return (
                    <Container>
                    <br />
                    <Card body>

                    <Row className="show-grid">
                    <Col sm={1}>
                        <Avatar
                        name={item.name}
                        round={true} 
                        src = {item.avatar_path} 
                        />
                    </Col>
                    <Col sm={8}>
                    <Card.Title>
                    <Link to='/students/profile' >
                    {item.name}
                    </Link>
                    </Card.Title>
                    
                    <Card.Text> University:  {item.curr_university}</Card.Text>
                    <Card.Text> {item.curr_degree} , Graduates {item.edu_end} </Card.Text>
                    <Card.Text> Major:  {item.curr_major}</Card.Text>
                    <Link to={server_url+item.student_resume} target="_blank"> View Resume </Link>
                    </Col>
                    <Col sm={3}>
                    <Card.Text> Applied on {item.app_date}</Card.Text>
                    
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} >
                    <DropdownToggle caret color='primary'>
                        {item.app_status}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Change status</DropdownItem>
                        {
                        
                        Object.keys(APP_STATUS).map((k) => {
                            if (APP_STATUS[k] !== item.app_status) {
                                return (
                                    <DropdownItem 
                                    onClick={e => changeStatus(item.id, APP_STATUS[k])}>
                                        {APP_STATUS[k]}
                                    </DropdownItem>
                                )
                            }
                        }) 
                        }
                    </DropdownMenu>
                    </ButtonDropdown>
                    </Col>
                    </Row>
                    </Card>
                    </Container>
                );
            })           
        
        }
        </Container>
    )
}


Applicants.propTypes = {
    setAlert : propTypes.func.isRequired
}

export default connect(null, { setAlert })(Applicants);
