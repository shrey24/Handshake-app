import React, {Component} from 'react'
import StudentRegister from "./StudentRegister";
import CompanyRegister from "./CompanyRegister";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

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
        //check login 
        if (this.props.user) {
            if(this.props.user.user_type === 'student') {
                return <Redirect to='/student/profile' />;
            } else {
                console.log('Already company login, Redirect to /companyLandingPage');
                return <Redirect to='/company/landing' />;
            }
        }

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

Register.propTypes = {
    user: propTypes.object
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});
export default connect(mapStateToProps, null)(Register);
