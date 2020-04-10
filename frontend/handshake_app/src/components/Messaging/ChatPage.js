import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Container, Tab, Nav, ListGroup } from 'react-bootstrap';
import NavBar from '../NavBar';
import Spinner from '../Spinner';
import Avatar from 'react-avatar';
import { getStudentProfile } from '../../actions/studentProfile';
import { getMessages, sendMessage } from '../../actions/messages';
import { connect } from 'react-redux';
import propTypes from 'prop-types'

import './ChatApp.css';


class ChatPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            conversationList: [],
            conversation: null,
            participant: {
                me: null,
                other: null      
            }
        }
    }

    getDetails = () => {
        const dummyConv = JSON.parse(
            `[
                {
                    "participants_id": [
                        "5e8d4341d975b733882c6bfb",
                        "5e8694a1911e7e1e531ae5b9"
                    ],
                    "_id": "5e8d3e9b1fffaa59c05968f5",
                    "__v": 0,
                    "messages": [
                        {
                            "_id": "5e8d3e9bd975b733882c6bee",
                            "from": "5e8694a1911e7e1e531ae5b9",
                            "time": "2020-04-08T03:01:47.168Z",
                            "content": "How about next wednesday?"
                        },
                        {
                            "_id": "5e8d3eadd975b733882c6bf1",
                            "from": "5e8694a1911e7e1e531ae5b9",
                            "time": "2020-04-08T03:02:05.992Z",
                            "content": "PS How about next mon?"
                        },
                        {
                            "_id": "5e8d3ecad975b733882c6bf4",
                            "from": "5e8694a1911e7e1e531ae5b9",
                            "time": "2020-04-08T03:02:34.222Z",
                            "content": "this is 3rd time"
                        },
                        {
                            "_id": "5e8d3ed8d975b733882c6bf7",
                            "from": "5e8694a1911e7e1e531ae5b9",
                            "time": "2020-04-08T03:02:48.243Z",
                            "content": "this is 4th time"
                        },
                        {
                            "_id": "5e8d3eedd975b733882c6bfa",
                            "from": "5e8694a1911e7e1e531ae5b9",
                            "time": "2020-04-08T03:03:09.975Z",
                            "content": "this is 5h time"
                        },
                        {
                            "_id": "5e8f9ed3204ba50544251d30",
                            "from": "5e8d4341d975b733882c6bfb",
                            "time": "2020-04-09T22:16:51.490Z",
                            "content": "this is response from try5 to Facebook"
                        }
                    ],
                    "participants_details": [
                        {
                            "avatar_path": null,
                            "_id": "5e8f9ed3204ba50544251d2e",
                            "user_id": "5e8d4341d975b733882c6bfb",
                            "user_name": "Try5"
                        },
                        {
                            "avatar_path": null,
                            "_id": "5e8f9ed3204ba50544251d2f",
                            "user_id": "5e8694a1911e7e1e531ae5b9",
                            "user_name": "HR at Facebook"
                        }
                    ]
                },
                {
                    "participants_id": [
                        "5e8694a1911e7e1e531ae5b9",
                        "5e8d4341d975b733882c6bfb"
                    ],
                    "_id": "5e8d43cc1fffaa59c05a6eff",
                    "__v": 0,
                    "messages": [
                        {
                            "_id": "5e8d43ccd975b733882c6c00",
                            "from": "5e8694a1911e7e1e531ae5b9",
                            "time": "2020-04-08T03:23:56.018Z",
                            "content": "this is 1 time"
                        },
                        {
                            "_id": "5e8d43d6d975b733882c6c03",
                            "from": "5e8694a1911e7e1e531ae5b9",
                            "time": "2020-04-08T03:24:06.195Z",
                            "content": "this is 2 time"
                        }
                    ],
                    "participants_details": [
                        {
                            "avatar_path": null,
                            "_id": "5e8d43d6d975b733882c6c01",
                            "user_id": "5e8694a1911e7e1e531ae5b9",
                            "user_name": "HR from Facebook"
                        },
                        {
                            "avatar_path": null,
                            "_id": "5e8d43d6d975b733882c6c02",
                            "user_id": "5e8d4341d975b733882c6bfb",
                            "user_name": "Try5"
                        }
                    ]
                }
            ]`
        );
        let participants = null;
        console.log('getDetails', dummyConv.participants_details);
        for (let p of dummyConv.participants_details ){
            if ( p.user_id === this.props.user.user_id ) {
                participants.me = {
                    name: p.user_name,
                    avatar_path: p.avatar_path
                }
            } else {
                participants.other = {
                    name: p.user_name,
                    avatar_path: p.avatar_path
                }
            }
        }
        this.setState(
            {
                ...this.state,
                participant: participants,
                conversationList: dummyConv.map(item => {
                    return (
                        {
                            ...item,
                            participants_details: item.participants_details.filter(i => i.user_id != this.props.user.user_id)
                        }
                    );
                })
            }
        );
    }

    componentDidMount(){
        this.props.getMessages();
    }

    handleViewMessage = (conv) => {
        let me = null, other = null;
        conv.participants_details.map(item => {
            if( item.user_id === this.props.user.user_id) {
                me = item;
            } else {
                other = item;
            }
        });
        this.setState({
            ...this.state,
            conversation: conv.messages,
            participant: {
                me, other
            }
        });
    }

    render() {
        console.log('ChatPage State: ', this.state);
        if(!this.props.user || this.props.messages.loading)
            return <Spinner />;
        if(this.props.messages.loading) {
            return <h2>fetching messages...</h2>;
        }
        // messages loaded in redux store
        const { conversations } = this.props.messages;
        let messageList = 'select a conversation';
        if (this.state.conversation) {
            messageList = this.state.conversation.map((msg, index) => {
                let msgClass, name;
                let { participant } = this.state;
                if (msg.from === this.props.user.user_id) {
                    msgClass = 'from-me';  
                    name = participant.me.user_name;
                } else {
                    msgClass = '';
                    name = participant.other.user_name;
                }
                return (
                    <div className={`message ${msgClass}`}>
                    <div className='username'>
                    { name } at { msg.time } 
                    </div>
                    <div className='message-body'>
                    { msg.content }
                    </div>
                </div>
                );
            });
        }

        return (
        <div>
        <NavBar />
        <br />
        <Container>
        <Card>
        
        <Row>
        <Col sm={5}>
        <ListGroup>
        {
            conversations.map((item, index) => {
                let otherUser = item.participants_details[0];
                if ( item.participants_details[0].user_id === this.props.user.user_id ) 
                    otherUser = item.participants_details[1];
                return (
                    <ListGroup.Item 
                    action 
                    variant="light"
                    onClick = {e => this.handleViewMessage(item)} 
                    key = {item._id} >
                    <Avatar 
                    name={otherUser.user_name}
                    round={true}
                    src={otherUser.avatar_path}
                    />      
                    { otherUser.user_name }     
                    </ListGroup.Item>
                )
            })
        }
        </ListGroup>    
        </Col>
        <Col sm={7} className='messages'>
            {
                messageList
            }
        </Col>
            </Row>
            </Card>
            </Container>
            </div>
        )
    }
}

ChatPage.propTypes = {
    user: propTypes.object.isRequired,
    conversations: propTypes.array.isRequired,
    getMessages: propTypes.func.isRequired,
    sendMessage: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    messages: state.messages   
});
export default connect(mapStateToProps, { getMessages, sendMessage })(ChatPage);