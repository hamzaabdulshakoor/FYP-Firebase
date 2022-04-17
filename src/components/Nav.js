import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Nav extends Component {

  render() {
    return (
      <nav className="nav d-flex justify-content-around border-bottom border-primary mb-2">
        <ul>
          <li>
            {this.props.user.type==="trainee"? <NavLink to="/home-trainee" exact activeClassName="active">
              Home
            </NavLink> : <NavLink to="/home" exact activeClassName="active">
              Home
            </NavLink>}
          </li>
          <li>
            <NavLink to="/chat" exact activeClassName="active">
              Chat
            </NavLink>
          </li>

          <li className="d-flex justify-content-end">
            <span className="mx-2">Welcome, {this.props.user.name}</span>

            <NavLink
              to="/logout"
              activeClassName="active"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
