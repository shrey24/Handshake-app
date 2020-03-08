import {
        GET_STUDENT_PROFILE, 
        ADD_STUDENT_EDUCATION, 
        DELETE_STUDENT_EDUCATION, 
        GET_STUDENT_EDUCATIONS 
    } from "./types";


export const getStudentProfile = (user_id) => async dispatch => {
    

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

