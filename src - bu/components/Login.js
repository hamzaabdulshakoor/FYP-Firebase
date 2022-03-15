import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Login extends Component {
  state = {
    email: "",
    password: "",
    toHome: false,
  };

  handleEmail = (e) => {
    this.setState(() => ({
      email: e.target.value,
    }));
  };

  handlePassword = (e) => {
    this.setState(() => ({
      password: e.target.value,
    }));
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { users, onLogin } = this.props;

    const user = users.filter(
      (u) => email === u.email && password === u.password
    )[0];
    onLogin(user);

    if (user) {
      return this.props.history.push("/home");
    } else {
      alert("Wrong email or password");
      this.setState({ email: "", password: "" });
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <Card className="center">
        <Card.Body>
          <Card.Header>Welcome to the GYM</Card.Header>
          <div>
            <span className="h2" style={{ color: "#00C8FF" }}>
              {" "}
              SIGN IN
            </span>
          </div>

          <form className="d-block my-2" onSubmit={this.handleLogin}>
            <div className="my-2">
              <input
                className=""
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleEmail}
              />
            </div>

            <div>
              <input
                className=""
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handlePassword}
              />
            </div>

            <div className="d-flex flex-column">
              <Button
                variant="primary"
                type="submit"
                className="mb-2"
                disabled={email === "" || password === "" ? true : false}
              >
                Login
              </Button>

              <NavLink to="/register" className="btn btn-secondary my-2">
                Register
              </NavLink>
            </div>
          </form>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Login);
