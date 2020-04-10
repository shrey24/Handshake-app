import {
    GET_CONVERSATIONS,
    SEND_MESSAGE,
    MESSAGE_ERR
} from '../actions/types';

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
                    {conversations: state.conversations.concat([action.payload])},
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
