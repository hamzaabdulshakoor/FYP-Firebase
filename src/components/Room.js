import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router";

import { CardDeck } from "react-bootstrap";

class Room extends Component {
  handleBooking = (e) => {
    e.preventDefault();
    const { room, checkInDate, checkOutDate, priceMultiplier } = this.props;

    let page = `/result/${checkInDate}/${checkOutDate}/${priceMultiplier}/payment/${room.title}`;
    return this.props.history.push(page);
  };
  render() {
    const { room, priceMultiplier } = this.props;
    return (
      <Card className="tweet">
        <div className="question-head">
          <h3>{room.title}</h3>
        </div>

        <CardDeck>
          <Card>
            <Card.Img
              variant="top"
              src={room.img}
              style={{
                borderEndStartRadius: "50%",
                borderStartEndRadius: "50%",
                background: "black",
              }}
            />
          </Card>
          <Card>
            <Card.Header>
              {parseInt(room.price) * parseInt(priceMultiplier)} for{" "}
              {priceMultiplier} {priceMultiplier > 1 ? "nights" : "night"}
            </Card.Header>

            <Card.Body className="center">
              <Form onSubmit={this.handleBooking}>
                {" "}
                <button className="btn-success btn-lg" type="submit">
                  Book
                </button>
              </Form>
            </Card.Body>
          </Card>
        </CardDeck>
      </Card>
    );
  }
}

export default withRouter(Room);
