import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import firebase from "../utils/firebase";

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    type: "",
    trainer:"",
    program:{}
  };

  handleName = (e) => {
    this.setState(() => ({
      name: e.target.value,
    }));
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

  handleType = (e) => {
    this.setState(() => ({
      type: e.target.value,
    }));
  };

  registerToFirebase = () => {
    // Add a new document in collection "users"
    // ADD CHECKING FOR DUPLICATE NAMES
    firebase
      .firestore()
      .collection("users")
      .doc()
      .set(this.state)
      .then(() => {
        alert("User added successfully");
        return this.props.history.push("/login");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  handleRegister = (e) => {
    e.preventDefault();
    this.registerToFirebase();
  };

  render() {
    const { email, password, name,type } = this.state;
    return (
      <Card className="center">
        <Card.Body>
          <Card.Header>Welcome to the GYM</Card.Header>
          <div>
            <span className="h2" style={{ color: "#00C8FF" }}>
              {" "}
              Register
            </span>
          </div>

          <form className="d-block my-2" onSubmit={this.handleRegister}>
            <div className="my-2">
              <input
                className=""
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={this.handleName}
              />
            </div>
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

            <div className="my-2">
              <input
                className=""
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handlePassword}
              />
            </div>

             <div onChange={this.handleType} className="my-2 ">

              <input className=" mx-2" type="radio" value="trainer" name="type" /> trainer

              <input className="mx-2" type="radio" value="trainee" name="type" /> trainee
            </div>

            <div className="d-flex flex-column">
              <Button
                variant="primary"
                type="submit"
                className="mb-2"
                disabled={
                  email === "" || password === "" || name === "" ||  type === "" ? true : false
                }
              >
                Register
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    );
  }
}
