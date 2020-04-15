import {
    GET_CONVERSATIONS,
    SEND_MESSAGE,
    MESSAGE_ERR
} from '../actions/types';

const initialState = {
    loading: true,
    conversations: [],
    isNewConversation: false
}

export default function(state = initialState, action) {
    
    const { type, payload } = action;
    
    switch (type) {
        case GET_CONVERSATIONS: // load all conversations
            console.log('GET_CONVERSATIONS', payload);
            return {...state, loading:false, conversations: payload};
        
        case SEND_MESSAGE:
            if (state.isNewConversation) {
                return Object.assign({},
                    state,
                    {conversations: [action.payload].concat(state.conversations)},
                    { isNewConversation: !state.isNewConversation }
                );
            } else {
                return Object.assign({}, 
                    state,
                    {
                        conversations: state.conversations.map((item) => {
                            if(action.payload._id === item._id) {
                                return action.payload;
                            } else {
                                return item;
                            }
                        })
                    }
                );
            }

        case MESSAGE_ERR:
            return state;
        
        default:
            return state;
    }
}
