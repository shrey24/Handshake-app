export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';

export const GET_STUDENT_EDUCATIONS = 'GET_STUDENT_EDUCATIONS';
export const ADD_STUDENT_EDUCATION = 'ADD_STUDENT_EDUCATION';
export const DELETE_STUDENT_EDUCATION = 'DELETE_STUDENT_EDUCATION';
export const UPDATE_STUDENT_EDUCATION = 'UPDATE_STUDENT_EDUCATION';

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const getStudentEducations = () => {
    return {
        type: GET_STUDENT_EDUCATIONS
    };
};

export const addStudentEducations = (eduItem) => {
    return {
        type: ADD_STUDENT_EDUCATION,
        payload: eduItem
    };
};

export const updateStudentEducations = (eduItem) => {
    return {
        type: UPDATE_STUDENT_EDUCATION,
        payload: eduItem
    };
};

export const deleteStudentEducations = (id) => {
    return {
        type: DELETE_STUDENT_EDUCATION,
        payload: id
    };
};