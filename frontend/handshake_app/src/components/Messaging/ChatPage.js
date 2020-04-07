import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Container, Tab, Nav, ListGroup } from 'react-bootstrap';
import NavBar from '../NavBar';
import Avatar from 'react-avatar';
import './ChatApp.css';


class ChatPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [
                {
                    from: 'Shrey',
                    content: "this is a test message"
                },
                {
                    from: 'Shrey',
                    content: "this is a test message"
                },
                {
                    from: 'Shrey',
                    content: "this is a test message"
                },
            ]
        }
    }

    componentDidMount(){

    }

    render() {
        return (
        <div>
        <NavBar />
        <br />
        <Container>
        <Card>
        
        <Row>
        <Col sm={5}>
        <ListGroup>
        <ListGroup.Item action variant="light">
        <Avatar 
        name='Shrey'
        round={true}
        src='{avatar_path}'
        />
                Light
        </ListGroup.Item>
        <ListGroup.Item action variant="light">Light</ListGroup.Item>
        <ListGroup.Item action variant="light">Light</ListGroup.Item>
        <ListGroup.Item action variant="light">Light</ListGroup.Item>
        </ListGroup>    
        </Col>
        <Col sm={7} className='messages'>
            {
                this.state.messages.map((msg, index) => {
                    return (
                        <div className={`message `}>
                        <div className='username'>
                          { msg.from }
                        </div>
                        <div className='message-body'>
                          { msg.content }
                        </div>
                      </div>
                    );
                })
            }
        </Col>
            </Row>
            </Card>
            </Container>
            </div>
        )
    }
}

export default ChatPage;