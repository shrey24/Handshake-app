import {
    GET_ALL_JOBS,
    GET_ALL_JOBS_ERR,
    APPLY_FOR_JOB
} from '../actions/types';

const initialState = {
    jobsDownload: [],
    loading: true
}

export default function(state = initialState, action) {
    
    const { type, payload } = action;
    
    switch (type) {
        case GET_ALL_JOBS: // load all conversations
            return {...state, jobsDownload: [...payload], loading:false};
        
        case APPLY_FOR_JOB:
            return state;

        case GET_ALL_JOBS_ERR:
            return initialState;        
        default:
            return state;
    }
}
