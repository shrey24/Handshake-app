import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
// import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../actions/auth';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   NavbarText,
//   Container
// } from 'reactstrap';
import {
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Button,
  Container
} from 'react-bootstrap';

class NavBar extends Component {
    constructor(props) {
      super(props)
      this.state = {
        logout : false
      }
    }

    handleLogout = (e) => {
      this.props.logout();
      this.setState({logout: true});
    }

  render() {
    if ( this.state.logout ) {
      return <Redirect to='/login' />;
    }
    const studentLinks = (
      <Nav className="mr-auto">
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
      <Nav.Link> <Link to='/register' style= {{ all: "inherit" }}>
          Register
      </Link></Nav.Link>  
      <Nav.Link> <Link to='/student/jobs' style= {{ all: "inherit" }}>
          Jobs
      </Link></Nav.Link>   
      <Nav.Link> <Link to='/student/jobs/applications' style= {{ all: "inherit" }}>
          My Applications
      </Link></Nav.Link>   
      <Nav.Link> <Link to='/Students' style= {{ all: "inherit" }}>
          Students
      </Link></Nav.Link>   
      <Nav.Link> <Link to='/Events' style= {{ all: "inherit" }}>
          Events
      </Link></Nav.Link>
  </Nav>
    );

const companyLinks = (
<Nav className="mr-auto">
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
      <Nav.Link> <Link to='/company/jobs' style= {{ all: "inherit" }}>
          Jobs
      </Link></Nav.Link>   
      <Nav.Link> <Link to='/Students' style= {{ all: "inherit" }}>
          Students
      </Link></Nav.Link>   
      <Nav.Link> <Link to='/Events' style= {{ all: "inherit" }}>
          Events
      </Link></Nav.Link>
  </Nav>
);

let links = null;
let profileLink = null;
if(this.props.user) {
  if(this.props.user.user_type === 'student') {
    links = studentLinks;
    profileLink = '/student/profile'
  } else {
    links = companyLinks;
    profileLink = '/company/profile'
  }
}


return(
  <Navbar bg="light" varient='light' expand="lg" sticky="top">
  <Navbar.Brand href="#home">Handshake</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  { links }

  <Row>
    <Col >
    <NavDropdown title="Profile" id="basic-nav-dropdown">
      <NavDropdown.Item>
      <Link to={profileLink} >
       View Profile
      </Link>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={this.props.logout}>Sign Out</NavDropdown.Item>
    </NavDropdown>
    </Col>
    <Col xs={{span:7}}> </Col>
  </Row>
  </Navbar.Collapse>
  </Navbar>
);
        
      // return(
      //   <Container fluid="true">
      //     <Navbar color="light" light expand="md" sticky="top">
      //       <NavbarBrand> Handshake </NavbarBrand>
            
      //       <Nav className="mr-auto" navbar>
      //         <NavItem>
      //         <Link to="/register">
      //                     Register
      //         </Link>
      //         </NavItem>
      //       </Nav> 
      //     </Navbar>
      //   </Container>
      // );   
  }     
}

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { logout })(NavBar);