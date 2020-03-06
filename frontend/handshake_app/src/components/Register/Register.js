import React, {Component} from 'react'
import StudentRegister from "./StudentRegister";
import CompanyRegister from "./CompanyRegister";
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type : 'student',
        }
    }

    handleChangeUserType = (e) => {
        let t = (this.state.type === 'student') ? 'company' : 'student';
        console.log('CHANGE TO : ', t);
        this.setState({ ...this.state, type: t });
        console.log('state changed to : ', this.state);
    }

    render() {
        let renderForm = (this.state.type === 'student') ? <StudentRegister /> : <CompanyRegister />;
        return (
            <div>
                <Link to='/login'> Already have an account? Sign in</Link>
                
                {/* <span onClick={this.handleChangeUserType}> 
                Not a {this.state.type} ? Click here 
                </span> */}
                {renderForm}
                <Link to='#' onClick={this.handleChangeUserType}>  Not a {this.state.type} ? Click here </Link>
            </div>
        );
    }
    
}

export default Register;
