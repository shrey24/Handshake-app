import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
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
    }

  render() {
    const studentLinks = (
      <Nav className="mr-auto">
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
      <Nav.Link> <Link to='/register' style= {{ all: "inherit" }}>
          Register
      </Link></Nav.Link>  
      <Nav.Link> <Link to='/Jobs' style= {{ all: "inherit" }}>
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

const companyLinks = studentLinks;
let links = null;
if(this.props.user) {
  links = this.props.user.user_type === 'student' ? studentLinks : companyLinks;
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
      <NavDropdown.Item href="#action/3.1">View Profile</NavDropdown.Item>
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