import React, { Component } from 'react';
import {Row, Col, Card, Container, ListGroup, Form, FormGroup, Button } from 'react-bootstrap';
import NavBar from '../NavBar';
import Spinner from '../Spinner';
import AlertComp from '../AlertComp';
import Avatar from 'react-avatar';
import { getStudentProfile } from '../../actions/studentProfile';
import { getCompanyProfile } from '../../actions/company';
import { getMessages, sendMessage } from '../../actions/messages';
import { USER_COMPANY, USER_STUDENT } from '../../actions/types';
import { connect } from 'react-redux';
import propTypes from 'prop-types'

import './ChatApp.css';


class ChatPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            conversationList: [],
            selected_conversation: null,
            conversation_messages: null,
            participant: {
                me: null,
                other: null      
            },
            inputText: ''
        }
    }

    // helper method to return Participant Details
    getParticipantDetails = (conv)  => {
        let me = null, other = null;
        conv.participants_details.map(item => {
            if( item.user_id === this.props.user.user_id) {
                me = item;
            } else {
                other = item;
            }
        });
        const participant = { me, other };
        return participant;
    }

    componentDidMount(){
        this.props.getMessages();
        /*
        if (this.props.user.user_type === USER_STUDENT) {
            await this.props.getStudentProfile();
        } else {
            await this.props.getCompanyProfile();
        }

        const { user_id, name, avatar_path } = this.props.location.state;
        const {conversations} = this.props.messages;
        if (user_id) {
            console.log(`set chat for ${user_id}`);
            let newConv = conversations.find(conv => {
                let participant = this.getParticipantDetails(conv);
                return participant.other.user_id === user_id;
            });
            if (newConv) { // found existing chat
                this.handleViewMessage(newConv);
            } else { // create a new chat
                this.setState({
                    selected_conversation: 'new_conv',
                    conversation_messages: [],
                    participant = {
                        other: {
                            user_id,
                            user_name: name,
                            avatar_path
                        },
                        me: {
                            user_id: this.props.user.user_id,
                            user_name: 
                            avatar_path:
                        }
                    }
                });
            }
        } else {
            console.log(`no new user param`);
        }
        */
    }

    componentWillReceiveProps() {
    }

    handleInput = (e) => {this.setState({ [e.target.name]: e.target.value });}

    onSubmit = (e) => {
        e.preventDefault();
        const messageObject = {
            to_user_id: this.state.participant.other.user_id, 
            to_user_name: this.state.participant.other.user_name, 
            to_avatar_path: this.state.participant.other.avatar_path, 
            from_user_name: this.state.participant.me.user_name, 
            from_avatar_path: this.state.participant.me.avatar_path, 
            content: this.state.inputText
        };
        this.props.sendMessage(messageObject);
        this.setState({inputText: ''});
    }

    handleViewMessage = (conv) => {
        let participants = this.getParticipantDetails(conv);
        console.log('@handleViewMessage: participants= ', participants);
        this.setState({
            ...this.state,
            conversation_messages: conv.messages,
            selected_conversation: conv._id,
            participant: participants
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
        console.log('render: conversations:', conversations);

        let messageList = 'select a conversation';
        let msgHeader=null;
        
        if (this.state.selected_conversation) {
            let conv_id = this.state.selected_conversation;
            let conv = conversations.find(i => i._id === conv_id);
            let { messages } = conv;
            let participant = this.getParticipantDetails(conv);
            msgHeader = participant.other.user_name;
            messageList = messages.map((msg, index) => {
                let msgClass, name, avatar_path;
                let { participant } = this.state;
                if (msg.from === this.props.user.user_id) {
                    msgClass = 'from-me';  
                    name = participant.me.user_name;
                    avatar_path = participant.me.avatar_path;
                } else {
                    msgClass = '';
                    name = participant.other.user_name;
                    avatar_path = participant.other.avatar_path;
                }
                return (
                    <div className={`message ${msgClass}`}>
                    <div className='username'>
                    
                    { name } at { msg.time } 
                    </div>
                    <Avatar 
                    name={name}
                    round={true}
                    size='30px'
                    src={avatar_path}
                    /> 
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
        <AlertComp />
        <br />
        <Container >
        <Card >
        <Row >
        <Col sm={5}> <h3 className='header-row'>Messages</h3> </Col>
        <Col sm={7}> 
        <div className='header-row' >
            <h3 >
                { msgHeader }
            </h3>
        </div>
         </Col>
        </Row>
        <Row>
        <Col sm={5} className='scroll'>
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
                    <Row>
                    <Col sm={3}>
                    <Avatar 
                    name={otherUser.user_name}
                    round={true}
                    size='70px'
                    src={otherUser.avatar_path}
                    />      
                    </Col>
                    <Col sm={9}>
                    <Row>
                    <b>{ otherUser.user_name } </b>
                    </Row>
                    <Row>
                    {item.messages[item.messages.length - 1].content.substring(0, 50)+'...'}
                    </Row>
                    
                    </Col>
                    </Row>
                        
                    </ListGroup.Item>
                )
            })
        }
        </ListGroup>    
        </Col>

        {/* chat section */}
        <Col sm={7} >
            <div className='messages'>
            {
                messageList
            }
            </div>
            

            
                {/* message input area */}
        <Form onSubmit={this.onSubmit}>
        <Form.Row>
        <FormGroup as={Col} sm={10} >
            <Form.Control
            onChange={this.handleInput}
            value={this.state.inputText}
            name= 'inputText'
            as="textarea" 
            rows="3" 
            placeholder="Type a message..." />
        </FormGroup>
        <FormGroup as={Col} >
        <Button variant="primary" type="submit">
            Send
        </Button>
        </FormGroup>
        </Form.Row>
        </Form>

        </Col>
        
        

        </Row>
        </Card>
        </Container>
        </div>
        );
    }
}

ChatPage.propTypes = {
    user: propTypes.object.isRequired,
    conversations: propTypes.array.isRequired,
    getMessages: propTypes.func.isRequired,
    sendMessage: propTypes.func.isRequired,
    student_profile: propTypes.array.isRequired,
    company_profile: propTypes.object.isRequired,
    getStudentProfile: propTypes.func.isRequired, 
    getCompanyProfile: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    messages: state.messages,
    student_profile: state.studentProfile.student_profile,
    company_profile: state.company.profile
});

export default connect(mapStateToProps, { 
    getMessages, 
    sendMessage, 
    getStudentProfile, 
    getCompanyProfile 
})(ChatPage);