import { combineReducers } from "redux";
import studentReducer from "./studentReducer";
import  alert from "./alert";
import  auth from "./auth";

export default combineReducers({
    student: studentReducer,
    alert: alert,
    auth: auth
});