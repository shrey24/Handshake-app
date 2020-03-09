import {
    GET_STUDENT_PROFILE,
    GET_STUDENT_PROFILE_ERR,
    UPDATE_STUDENT_EDUCATION,
    DELETE_STUDENT_EDUCATION,
    ADD_STUDENT_EDUCATION
} from '../actions/types';

const initialState = {
    loading: true,
    student_profile : null,
    student_education : null,
    student_experience : null    
}

export default function(state = initialState, action) {
    
    const { type, payload } = action;
    
    switch (type) {
        case GET_STUDENT_PROFILE:
            console.log('GET_STUDENT_PROFILE', payload);
            return {...state, loading:false, ...payload};
        case GET_STUDENT_PROFILE_ERR:
            return Object.assign({}, state, initialState);

        case DELETE_STUDENT_EDUCATION:
            return Object.assign({}, 
                state, 
                {educationItems: state.educationItems.filter(item => item.id !== action.payload)}
                );

        case ADD_STUDENT_EDUCATION:
            return Object.assign({}, 
                state, 
                {educationItems: state.educationItems.concat(action.payload)}
                );

        case UPDATE_STUDENT_EDUCATION:
            return Object.assign({}, 
                state, 
                {
                    educationItems: state.educationItems.map((item) => {
                        if(action.payload.id === item.id) {
                            return action.payload;
                        } else {
                            return item;
                        }
                    })
                }
                );
        
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