import * as actions from '../actions/types';

const initialState = {
    educationItems : [
        {
            college_name: "college_name1",
            degree: "Masters",
            major: "Computer Science",
            start_date: 2018,
            end_date: 2018,
            gpa: 4.0
        },
        {
            college_name: "college_name2",
            degree: "Bachelors",
            major: "Computer Science",
            start_date: 2018,
            end_date: 2018,
            gpa: 4.0
        }
    ]
}

export default function(state = initialState, action) {
    switch (action.type) {
        case actions.GET_STUDENT_EDUCATIONS:
            return Object.assign({}, state);
        
        default:
            return state;
    }

}