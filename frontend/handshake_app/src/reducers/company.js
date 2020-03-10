import {
    GET_COMPANY_PROFILE,
    GET_COMPANY_PROFILE_ERR,
    ERR_UPDATE_PROFILE
} from '../actions/types';

const initialState = {
    loading: true,
    profile: null,
}

export default function(state = initialState, action) {
    
    const { type, payload } = action;
    
    switch (type) {
        case GET_COMPANY_PROFILE:
            return {...state, loading:false, profile: payload};
        case GET_COMPANY_PROFILE_ERR:
            return Object.assign({}, state, initialState);

        case ERR_UPDATE_PROFILE:
            return state;
        
        default:
            return state;
    }

}