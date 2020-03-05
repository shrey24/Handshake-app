import React from 'react'
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


// destructure { alerts } = props
const AlertComp = ({ alerts }) => 
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <Alert key={alert.id} color={alert.alertType}>
            {alert.msg}
        </Alert>

    ));

AlertComp.propTypes = {
    alerts: PropTypes.array.isRequired
}

// alerts is the redux state array state.alert
const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(AlertComp);
