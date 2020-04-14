import axios from 'axios';
import {setAlert} from './alert';

import {
        GET_STUDENTS,
        GET_STUDENTS_ERR,
        GET_STUDENT_PROFILE, 
        GET_STUDENT_PROFILE_ERR,
        ADD_STUDENT_EDUCATION, 
        DELETE_STUDENT_EDUCATION, 
        UPDATE_STUDENT_EDUCATION,
        UPDATE_STUDENT_EXP,
        ADD_STUDENT_EXP,
        DELETE_STUDENT_EXP,
        ERR_UPDATE_PROFILE,
        GET_STUDENT_EDUCATIONS

    } from "./types";


const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
axios.defaults.withCredentials = true;

// get student profiles for students tab
export const getStudents = () => async dispatch => {
    try {
        const res = await axios.get(`/student-profile/students`);
        console.log('getStudents ****************************');
        console.log(`/student-profile/students`, res);
        dispatch({
            type: GET_STUDENTS,
            payload: res.data
        });

    } catch (err) {
        console.log('action getStudents Error:', err.body);
        dispatch({
            type: GET_STUDENTS_ERR,
            payload: err.body
        });
        // dispatch(setAlert(err.body.error, 'danger'));
    }
}

export const getStudentProfile = (user_id) => async dispatch => {
    try {
        if (!user_id) user_id = 'Me';
        const res = await axios.get(`/student-profile/${user_id}`);
        console.log('getStudentProfile ****************************');
        console.log(`/student-profile/${user_id}`, res);
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
        // dispatch(setAlert(err.body.error, 'danger'));
    }
}
// export const getStudentEducations = () => {
//     return {
//         type: GET_STUDENT_EDUCATIONS
//     };
// };

// Experience section
export const addStudentExperience = (expItem) => async dispatch => {
    try {
        const data = JSON.stringify(expItem);
        const res = await axios.post(`/student-profile/experience`,
                        data, 
                        config
                    );
        //success
        dispatch({
            type: ADD_STUDENT_EXP,
            payload: {
                ...expItem,
                id: res.data.id
            }
        });
        dispatch(getStudentProfile()); //refresh data
    } catch (error) {
        console.log('addStudentExperience action ERROR: ', error);
        dispatch({
            type: ERR_UPDATE_PROFILE,
            payload: {
                error: error.body
            }
        });
        dispatch(setAlert(`Unable to add new item: ${error.body}`, 'danger'));
    }
};

export const updateStudentExperince = (exp_id, expItem) => async dispatch =>  {
    try {
        const res = await axios.put(`/student-profile/experience/${exp_id}`,
            expItem, 
            config
        );
        //success
        dispatch({
            type: UPDATE_STUDENT_EXP,
            payload: {
                ...expItem,
                id: exp_id
            }
        });
        dispatch(getStudentProfile()); //refresh data
    } catch (error) {
        console.log('updateStudentExperience action ERROR: ', error);
        dispatch({
            type: ERR_UPDATE_PROFILE,
            payload: {
                error: error.body
            }
        });
        dispatch(setAlert(`Unable to add new item: ${error.body}`, 'danger'));
    }
};

// export const deleteStudentExperience = (id) => {
//     return {
//         type: DELETE_STUDENT_EXP,
//         payload: id
//     };
// };

export const addStudentEducation = (eduItem) => async dispatch =>  {
    try {
        const data = JSON.stringify(eduItem);
        const res = await axios.post(`/student-profile/education`,
                        data, 
                        config
                    );
        //success
        dispatch({
            type: ADD_STUDENT_EDUCATION,
            payload: {
                ...eduItem,
                id: res.data.id
            }
        });
    } catch (error) {
        dispatch({
            type: ERR_UPDATE_PROFILE,
            payload: {
                error: error.body
            }
        });
        dispatch(setAlert(`Unable to add new item: ${error.body}`, 'danger'));
    }
};

export const updateStudentEducation = (id, eduItem) => async dispatch =>  {
    try {
        const res = await axios.put(`/student-profile/education/${id}`,
            eduItem, 
            config
        );
        //success
        dispatch({
            type: UPDATE_STUDENT_EDUCATION,
            payload: {
                ...eduItem,
                id: id
            }
        });
        // dispatch(getStudentProfile());
    } catch (error) {
        console.log('updateStudentEducation action ERROR: ', error);
        dispatch({
            type: ERR_UPDATE_PROFILE,
            payload: {
                error: error.body
            }
        });
        dispatch(setAlert(`Unable to add new item: ${error.body}`, 'danger'));
    }
};

export const deleteStudentEducation = (id) => async dispatch =>  {
    return {
        type: DELETE_STUDENT_EDUCATION,
        payload: id
    };
};

