import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faUserPlus, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import {logoutUser} from '../services/index'

class NavigationBar extends Component {

  logout = () => {
    this.props.logoutUser();
  }
  render() {
    const guestLinks = (
      <>
        <div className="mr-auto"></div>
        <Nav className="navbar-right">
          <Link to={"register"} className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} />
            Register
          </Link>
          <Link to={"login"} className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt} />
            Login
          </Link>
        </Nav>
      </>
    );

    const userLinks = (
      <>
        <Nav className="me-auto">
          <Link to={"add"} className="nav-link">
            Add project
          </Link>
          <Link to={"list"} className="nav-link">
            Project list
          </Link>
          <Link to={"users"} className="nav-link">
            User list
          </Link>
        </Nav>
        <Nav className="navbar-right">
          <Link to={"logout"} className="nav-link" onClick={this.logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </Link>
        </Nav>
      </>
    );
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to={"/"} className="navbar-brand">
            Dashboard
          </Link>
          {this.props.auth.isLoggedIn ? userLinks : guestLinks}
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
