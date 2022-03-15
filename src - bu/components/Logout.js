import React, { Component } from "react";
import { Redirect } from "react-router";

class Logout extends Component {
  render() {
    return (
      <Redirect to={{ pathname: "/login", state: { redirect: "/home" } }} />
    );
  }
}

export default Logout;
