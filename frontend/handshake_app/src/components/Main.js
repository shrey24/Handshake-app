import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import ChatPage from './Messaging/ChatPage';
import StudentProfile from "./Student/StudentProfile/StudentProfile";
import Jobs from "./Student/Jobs/Jobs";
import Applications from "./Student/Applications";
import StudentEventsPage from './Student/Events/Events';
import Landing from './Company/Landing';
import companyJobsPage from './Company/Jobs/Jobs';
import Events from './Company/Events/Events';
import EventPage from './DisplayEvent/Event';
import CompanyProfile from './Company/CompanyProfile/CompanyProfile';
import Students from './StudentsTab/Students';
import StudentProfileViewPage from './StudentsTab/StudentProfile/StudentProfileViewPage';

//Create a Main Component
class Main extends Component {

   
    render(){        
        return(
            <div>
                <Route exact path="/" component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route exact path="/students" component={Students}/>
                <Route exact path="/students/:studentId" component={StudentProfileViewPage}/>
                <Route exact path="/messages/:user_id" component={ChatPage}/>
                <Route exact path="/messages" component={ChatPage}/>
                <Route exact path="/student/profile" component={StudentProfile}/>
                <Route exact path="/student/jobs" component={Jobs}/>
                <Route exact path="/student/events" component={StudentEventsPage}/>
                <Route exact path="/student/jobs/applications" component={Applications}/>
                <Route exact path='/company/profile' component={CompanyProfile}/>
                <Route exact path='/company/landing' component={Landing}/>
                <Route exact path='/company/jobs' component={companyJobsPage}/>
                <Route exact path='/company/events' component={Events}/>
                
                <Route path='/event/:event_id' component={EventPage}/>
                
                {/*Render Different Component based on Route*/} 

            </div>
        )
    }
}
//Export The Main Component
export default Main;