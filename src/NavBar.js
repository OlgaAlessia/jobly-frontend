import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext"


function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function userLoggeIn() {
    return (
      <NavItem>
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/" onClick={logout}>Log out {currentUser.username}</NavLink>
      </NavItem>
    );
  }

  function userNotLogged() {
    return (
      <NavItem>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </NavItem>
    );
  }

  /*
    return (
      <Navbar className="Navigation navbar navbar-expand-md">
        <NavLink className="navbar-brand" exact to="/" > Jobly </NavLink>
  
        <Nav className="navbar-nav ms-auto navbar">
  
          {!currentUser ? userNotLogged() : userLoggeIn()}
        </Nav>
      </Navbar>
    );
  */
  return (
    <Navbar className="Navigation navbar navbar-expand-md">
      <NavLink className="navbar-brand" exact to="/" > Jobly </NavLink>

      <Nav className="navbar-nav ms-auto navbar">

        {!currentUser ?
          <NavItem>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </NavItem>
          :
          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/jobs">Jobs</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/" onClick={logout}>Log out {currentUser.username}</NavLink>
          </NavItem>}
      </Nav>
    </Navbar>
  );



}

export default NavBar;