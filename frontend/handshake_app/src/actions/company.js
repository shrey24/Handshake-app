import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_COMPANY_PROFILE,
    GET_COMPANY_PROFILE_ERR
} from './types';


const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
axios.defaults.withCredentials = true;

export const getCompanyProfile = (cmp_id) => async dispatch => {
    try {
        if (!cmp_id) cmp_id = 'Me';
        const res = await axios.get(`/company/profile/${cmp_id}`);
        console.log('getCompanyProfile ****************************');
        console.log(`/student-profile/${cmp_id}`, res);
        dispatch({
            type: GET_COMPANY_PROFILE,
            payload: res.data
        });

    } catch (err) {
        console.log('action getCompanyProfile Error:', err.body);
        dispatch({
            type: GET_COMPANY_PROFILE_ERR,
            payload: err.body
        });
        // dispatch(setAlert(err.body.error, 'danger'));
    }
}