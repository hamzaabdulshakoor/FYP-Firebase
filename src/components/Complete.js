import React, { Component } from "react";
import { withRouter } from "react-router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Complete extends Component {
  goHome = () => {
    let page = "/home";

    return this.props.history.push(page);
  };
  render() {
    const { name, nights, checkInDate, checkOutDate, roomId } = this.props;
    return (
      <Card className="center bg bg-white border border-success">
        <Card.Body>
          <Card.Header className="bg bg-success">
            Reservation complete
          </Card.Header>

          <Card.Header className="border border-dark">Name: {name}</Card.Header>
          <Card.Header className="border border-dark">{roomId}</Card.Header>
          <Card.Header className="border border-dark">
            Check In Date: {checkInDate}
          </Card.Header>
          <Card.Header className="border border-dark">
            Check Out Date: {checkOutDate}
          </Card.Header>
          <Card.Header className="border border-dark">
            Nights: {nights}
          </Card.Header>
          <Button
            className="border border-dark float-right mt-2"
            onClick={this.goHome}
          >
            Go back home
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Complete);
