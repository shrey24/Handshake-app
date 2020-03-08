import axios from 'axios';
import {setAlert} from './alert';

import {
        GET_STUDENT_PROFILE, 
        GET_STUDENT_PROFILE_ERR,
        ADD_STUDENT_EDUCATION, 
        DELETE_STUDENT_EDUCATION, 
        GET_STUDENT_EDUCATIONS,
        UPDATE_STUDENT_EDUCATION 
    } from "./types";


export const getStudentProfile = (user_id) => async dispatch => {
    try {
        const res = await axios.get(`/student/profile/${user_id}`);
        console.log(`/student/profile/${user_id}`, res);
        dispatch({
            type: GET_STUDENT_PROFILE,
            payload: res.data
        });

    } catch (err) {
        console.log('action getStudentProfile Error:', err.body);
        dispatch({
            type: GET_STUDENT_PROFILE_ERR,
            payload: err.body
        });
        dispatch(setAlert(err.body.error, 'danger'));
    }
    


}
// export const getStudentEducations = () => {
//     return {
//         type: GET_STUDENT_EDUCATIONS
//     };
// };

export const addStudentEducation = (eduItem) => {
    return {
        type: ADD_STUDENT_EDUCATION,
        payload: eduItem
    };
};

export const updateStudentEducation = (eduItem) => {
    return {
        type: UPDATE_STUDENT_EDUCATION,
        payload: eduItem
    };
};

export const deleteStudentEducation = (id) => {
    return {
        type: DELETE_STUDENT_EDUCATION,
        payload: id
    };
};

