import { combineReducers } from "redux";
import studentReducer from "./studentReducer";
import  alert from "./alert";

export default combineReducers({
    student: studentReducer,
    alert: alert
});