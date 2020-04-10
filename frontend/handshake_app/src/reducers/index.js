import { combineReducers } from "redux";
import studentProfile from "./studentProfile";
import company from "./company";
import  alert from "./alert";
import  auth from "./auth";
import  messages from "./messages";

export default combineReducers({
    studentProfile: studentProfile,
    alert: alert,
    auth: auth,
    company: company,
    messages: messages
});