import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_ALL_JOBS,
    APPLY_FOR_JOB,
    GET_ALL_JOBS_ERR
} from './types';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
axios.defaults.withCredentials = true;


export const getAllJobs = () => async dispatch =>  {
    axios.get('/jobs/all')
        .then((res) => {
            console.log('getAllJobs loading new data');
            dispatch({
                type: GET_ALL_JOBS,
                payload: res.data
            });
            // this.setState({ jobsDownload: [...res.data]});
        })
        .catch((err) => {
            console.log('err, unable to fetch /jobs/all', err);
            dispatch({
                type: GET_ALL_JOBS_ERR
            })
            dispatch(setAlert(`Error: Unable of fetch messages, see console for error`, 'danger'));
        });
};

export const applyForJob = () => async dispatch =>  {
    dispatch({
        type: APPLY_FOR_JOB,    
    });
};