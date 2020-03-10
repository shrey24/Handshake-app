import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register'
import  StudentProfile from "./Student/StudentProfile/StudentProfile";
import  Jobs from "./Student/Jobs/Jobs";
import Landing from './Company/Landing';
import companyJobsPage from './Company/Jobs/Jobs';

//Create a Main Component
class Main extends Component {

   
    render(){        
        return(
            <div>
                <Route exact path="/" component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/student/profile" component={StudentProfile}/>
                <Route path="/student/jobs" component={Jobs}/>
                <Route path='/company/landing' component={Landing}/>
                <Route path='/company/jobs' component={companyJobsPage}/>
                
                {/*Render Different Component based on Route*/} 

            </div>
        )
    }
}
//Export The Main Component
export default Main;