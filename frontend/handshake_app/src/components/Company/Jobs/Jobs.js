import React, { Component } from 'react';
import { Button, Label, Form, FormGroup, Input, Container, Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { setAlert } from '../../../actions/alert';
import { getCompanyProfile } from '../../../actions/company';
import AlertComp from '../../AlertComp';
import AddJobForm from './AddJobForm';
import Navbar from '../../NavBar';
import Dum from './dum';


class Jobs extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getCompanyProfile();
    }
    
    render() {
        return (
            <div>
                 <Navbar />
            <h3> Jobs page</h3>
            <AddJobForm />
            </div>
        );
    }
}


Jobs.propTypes = {
    setAlert : propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    profile: propTypes.array.isRequired,
    getCompanyProfile: propTypes.func.isRequired,
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.company.profile
});
export default connect(mapStateToProps, { getCompanyProfile })(Jobs);
