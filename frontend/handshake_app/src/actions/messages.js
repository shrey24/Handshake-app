import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_CONVERSATIONS,
    SEND_MESSAGE,
    MESSAGE_ERR
} from './types';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
axios.defaults.withCredentials = true;


export const getMessages = () => async dispatch =>  {
    try {
        const res = await axios.get(`/messages/all`);
        // modify structure
        // const data = res.data.map((doc) => {
        //     doc.participants_details = doc.participants_details.filter(item => item.user_id != user_id);
        // })
        //success
        let data = res.data;
        // sort decreasing order of message date
        data.sort((a, b) => { 
            let aTime = new Date(a.messages[a.messages.length-1].time);
            let bTime = new Date(b.messages[b.messages.length-1].time);
            if(aTime <= bTime) return 1;
            else return -1;
        });
        
        dispatch({
            type: GET_CONVERSATIONS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MESSAGE_ERR,
            payload: {
                error: error.body
            }
        });
        console.log('getMessages Error: ', error.body);
        dispatch(setAlert(`Error: Unable of fetch messages, see console for error`, 'danger'));
    }
};

export const sendMessage = (messageObject) => async dispatch =>  {
    try {
        const data = JSON.stringify(messageObject);
        const res = await axios.post(`/messages/new`,
                        data, 
                        config
                    );
        //success
        dispatch({
            type: SEND_MESSAGE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: MESSAGE_ERR,
            payload: {
                error: error.body
            }
        });
        console.log('sendMessage Error: ', error.body);
        dispatch(setAlert(`Error: Error in sending message. see console for error`, 'danger'));
    }
};