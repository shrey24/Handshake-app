import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import Avatar from 'react-avatar';
import NavBar from '../NavBar';
import { APP_STATUS } from '../../actions/types';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const Applications = (props) => {
    const [applicationList, setApplicationList] = useState([]);
    const [showList, setShowList] = useState([]);
    const [filterStatus, setFilterStatus] = useState({
        'pending' : false,
        'reviewed': false,
        'declined' : false
    });
    console.log('filterStatus: ', filterStatus);
    
    const filter = () => {
        if(!filterStatus['pending'] && !filterStatus['reviewed'] && !filterStatus['declined']){
            setShowList([...applicationList]);
        } else {
            let  newList = [];
            Object.keys(filterStatus).map((status) => {
                if(filterStatus[status]) {
                  newList = newList.concat(applicationList.filter((app) => app.app_status === status));
                }
            });

            console.log('New List, ', newList); 
            setShowList(newList);
        }    
    };

    const toggle = (stat) => {
        switch (stat) {
            case 'pending':
                setFilterStatus({...filterStatus, 'pending': !filterStatus['pending']});
                break;
            case 'reviewed':
                setFilterStatus({...filterStatus, 'reviewed': !filterStatus['reviewed']});
                break;
            case 'declined':
                setFilterStatus({...filterStatus, 'declined': !filterStatus['declined']});
                break;
        }
        
        // filter();
    }
    useEffect(() => {
        filter();
    }, [filterStatus]);

    useEffect(() => {  
        axios.get('/jobs/applications')
            .then(res => {
                console.log('Applications fetched: ', res);                    
                setApplicationList([...res.data]);
                setShowList([...res.data]);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (showList.length === 0 ) {
        return (
            <div>
        <NavBar />
        <br />       
        <Container>
            <h3>No jobs applied. Start applying today</h3>
        </Container>
        </div>
        );
    }

    return (
       
        <div>
        <NavBar />
        <br />       
        <Container>
        <Row>
        <Col sm={2} >
        <Card body> 
            <Card.Title> Filter </Card.Title>
            < hr />
            <Form.Check 
                 type='checkbox'
                 label={'pending'}
                 onClick = {e => { toggle('pending') } }
                />
            <Form.Check 
                 type='checkbox'
                 label={'reviewed'}
                 onClick = {e => { toggle('reviewed') } }
                />
            <Form.Check 
                 type='checkbox'
                 label={'declined'}
                 onClick = {e => { toggle('declined') } }
                />
            {
                // Object.keys(APP_STATUS).map((stat) => {
                //     return(
                //         <Form.Check 
                //         type='checkbox'
                //         label={APP_STATUS[stat]}
                //         onClick = {e => { toggle(APP_STATUS[stat]) } }
                //         />
                //     )
                // })    
            }
            
           

        </Card>
        </Col>

        <Col>
        
        {
            showList.map((item, index) => {
                return (
                    <Container>
                    
                    <Card body>

                    <Row className="show-grid">
                    <Col sm={2}>
                        <Avatar
                        name={item.company_name}
                        src = {item.avatar_path} 
                        />
                    </Col>
                    <Col >
                    <Card.Title>
                    <Link to={{pathname:'/company/profile', user_id:'comp_id'}} >
                    {item.job_title}
                    </Link>
                    </Card.Title>
                    
                    <Card.Text> {item.company_name}</Card.Text>
                    <Card.Text> Status:  {item.app_status}</Card.Text>
                    <Card.Text> Applied on {item.app_date}</Card.Text>
                    </Col>

                    </Row>
                    </Card>
                    <br />
                    </Container>
                );
            })           
        
        }

        </Col>
        </Row>

        </Container>

        </div>
    )
}




export default Applications;

