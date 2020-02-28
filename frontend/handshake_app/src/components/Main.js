import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register'
import  StudentProfile from "./Student/StudentProfile/StudentProfile";
//Create a Main Component
class Main extends Component {

   
    render(){        
        return(
            <div>
                <Route exact path="/" component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/student/profile" component={StudentProfile}/>
                {/*Render Different Component based on Route*/} 

            </div>
        )
    }
}
//Export The Main Component
export default Main;