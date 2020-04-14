import {
    GET_STUDENTS,
    GET_STUDENTS_ERR,
    GET_STUDENT_PROFILE,
    GET_STUDENT_PROFILE_ERR,
    UPDATE_STUDENT_EDUCATION,
    DELETE_STUDENT_EDUCATION,
    ADD_STUDENT_EDUCATION,
    ADD_STUDENT_EXP,
    UPDATE_STUDENT_EXP,
    ERR_UPDATE_PROFILE
} from '../actions/types';

const initialState = {
    loading: true,
    student_profile : null,
    student_education : null,
    student_experience : null,
    students : null    
}

export default function(state = initialState, action) {
    
    const { type, payload } = action;
    
    switch (type) {
        case GET_STUDENT_PROFILE:
            console.log('GET_STUDENT_PROFILE', payload);
            return {...state, loading:false, ...payload};
        case GET_STUDENT_PROFILE_ERR:
            return Object.assign({}, state, initialState);
        
        case ADD_STUDENT_EXP:
            return {...state, loading:true}; // set loading:true re-render studentprofile

        case UPDATE_STUDENT_EXP:
            return {...state, loading:true};

        case DELETE_STUDENT_EDUCATION:
            return Object.assign({}, 
                state, 
                {educationItems: state.educationItems.filter(item => item.id !== action.payload)}
                );

        case ADD_STUDENT_EDUCATION:
            return Object.assign({}, 
                state, 
                {student_education: state.student_education.concat(action.payload)}
                );

        case UPDATE_STUDENT_EDUCATION:
            return Object.assign({}, 
                state, 
                {
                    student_education: state.student_education.map((item) => {
                        if(action.payload.id === item.id) {
                            return action.payload;
                        } else {
                            return item;
                        }
                    })
                }
            );
        
        case GET_STUDENTS:
            return {...state, students: payload};
        
        case GET_STUDENTS_ERR:
            return {...state, students: null};
            
        case ERR_UPDATE_PROFILE:
            return state;
        
        default:
            return state;
    }

}

// {
//     id:1,
//     college_name: "college_name1",
//     degree: "Masters",
//     major: "Computer Science",
//     start_date: 2018,
//     end_date: 2018,
//     gpa: 4.0
// },
// {
//     id:2,
//     college_name: "college_name2",
//     degree: "Bachelors",
//     major: "Computer Science",
//     start_date: 2018,
//     end_date: 2018,
//     gpa: 4.0
// }