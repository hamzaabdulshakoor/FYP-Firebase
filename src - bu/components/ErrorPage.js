import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router";

class ErrorPage extends Component {
  render() {
    if (this.props.user === null) {
      return <Redirect to={{ pathname: "/login", state: { redirect: "/" } }} />;
    }
    return (
      <Card className="tweet">
        <div className="h1 center">Error 404</div>
      </Card>
    );
  }
}

export default ErrorPage;
