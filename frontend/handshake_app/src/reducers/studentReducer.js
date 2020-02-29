import * as actions from '../actions/types';

const initialState = {
    educationItems : [
        {
            id:1,
            college_name: "college_name1",
            degree: "Masters",
            major: "Computer Science",
            start_date: 2018,
            end_date: 2018,
            gpa: 4.0
        },
        {
            id:2,
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

        case actions.DELETE_STUDENT_EDUCATION:
            return Object.assign({}, 
                state, 
                {educationItems: state.educationItems.filter(item => item.id !== action.payload)}
                );

        case actions.ADD_STUDENT_EDUCATION:
            return Object.assign({}, 
                state, 
                {educationItems: state.educationItems.concat(action.payload)}
                );

        case actions.UPDATE_STUDENT_EDUCATION:
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