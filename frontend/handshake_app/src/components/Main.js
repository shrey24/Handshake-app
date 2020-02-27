import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register'

//Create a Main Component
class Main extends Component {

   
    render(){
        console.log("main component rendered");
        
        return(
            <div>
                {/*Render Different Component based on Route*/} 
                <Route exact path="/" component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;