import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container
} from 'reactstrap';

class NavBar extends Component {

    // const { isAuthenticated } = this.props.auth;

   
    render(){
        // const userLinks = (
        //     <ul className="nav navbar-nav navbar-right">
        //       <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
        //     </ul>
        //   );
      
        //   const guestLinks = (
        //     <ul className="nav navbar-nav navbar-right">
        //       <li><Link to="/signup">Sign up</Link></li>
        //       <li><Link to="/login">Login</Link></li>
        //     </ul>
        //   );

        return(
          <Container>
            <Navbar color="light" light expand="md">
              <NavbarBrand> Handshake </NavbarBrand>
              
              <Nav className="mr-auto" navbar>
                <NavItem>
                <Link to="/register">
                            Register
                </Link>
                </NavItem>
              </Nav> 
            </Navbar>
          </Container>
        );
    //     return (
    //         <div className="container">
    //         <nav className="navbar navbar-default">
    //     <div className="container-fluid">
    //       <div className="navbar-header">
    //         <Link to="/" className="navbar-brand">Handshake</Link>
    //       </div>

    //       <div className="collapse navbar-collapse">
    //         {/* { isAuthenticated ? userLinks : guestLinks } */}
    //         <ul className="nav navbar-nav navbar-right">
    //             <li><Link to="/register">
    //                     Register
    //                 </Link>
    //             </li>
    //         </ul>

    //       </div>
    //     </div>
    //   </nav>
    // </div>
            
    //     );
  }     
}

export default NavBar;