import React, {Component} from 'react'
import StudentRegister from "./StudentRegister";
import CompanyRegister from "./CompanyRegister";

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
                <span onClick={this.handleChangeUserType}> 
                Not a {this.state.type} ? Click here 
                </span>
                
                {renderForm}
            </div>
        );
    }
    
}

export default Register;
