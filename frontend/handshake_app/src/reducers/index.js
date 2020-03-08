import { combineReducers } from "redux";
import studentProfile from "./studentProfile";
import  alert from "./alert";
import  auth from "./auth";

export default combineReducers({
    studentProfile: studentProfile,
    alert: alert,
    auth: auth
});