import {
    GET_STUDENT_PROFILE,
    UPDATE_STUDENT_EDUCATION,
    DELETE_STUDENT_EDUCATION,
    ADD_STUDENT_EDUCATION
} from '../actions/types';

const initialState = {
    student_profile : [],
    student_education : [],
    student_experience : []
}

export default function(state = initialState, action) {
    
    const { type, payload } = action;
    
    switch (type) {
        case GET_STUDENT_PROFILE:
            return Object.assign({}, state, ...payload);

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