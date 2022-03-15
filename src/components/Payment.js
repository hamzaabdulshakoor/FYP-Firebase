import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import firebase from "../utils/firebase";

class Payment extends Component {
  state = {
    name: "",
    card: "",
    expiryDate: "",
    cvc: "",
  };

  handleChange = (e) => {
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  handlePassword = (e) => {
    this.setState(() => ({
      password: e.target.value,
    }));
  };

  addReservationToFirebase = () => {
    const {
      checkInDate,
      checkOutDate,
      roomId,
      user,
      priceMultiplier,
    } = this.props;
    // Add a new document in collection "users"
    // ADD CHECKING FOR DUPLICATE NAMES
    firebase
      .firestore()
      .collection("reservations")
      .add({
        user_email: user.email,
        user_name: user.name,
        room: roomId,
        checkInDate,
        checkOutDate,
        Nights: priceMultiplier,
      })
      .then(() => {
        // alert("Reservation added successfully");
        const page = `/complete/${checkInDate}/${checkOutDate}/${priceMultiplier}/${roomId}/${user.name}`;

        return this.props.history.push(page);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  handlePayment = (e) => {
    e.preventDefault();
    this.addReservationToFirebase();
  };
  render() {
    if (this.props.user === null) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    const { name, card, expiryDate, cvc } = this.state;
    return (
      <Card className="center">
        <Card.Body>
          <Card.Header>Finalize with payment</Card.Header>

          <form className="d-block my-2" onSubmit={this.handlePayment}>
            <div className="my-2">
              <input
                className=""
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div className="my-2">
              <input
                className=""
                type="number"
                name="card"
                placeholder="Card number"
                value={card}
                onChange={this.handleChange}
              />
            </div>

            <div className="my-2">
              <input
                className=""
                type="number"
                name="cvc"
                placeholder="cvc"
                value={cvc}
                onChange={this.handleChange}
              />
            </div>

            <div className="my-2">
              <span>Expiry Date</span>
            </div>
            <div className="my-2">
              <input
                className=""
                type="month"
                name="expiryDate"
                placeholder="Expiry date"
                value={expiryDate}
                onChange={this.handleChange}
              />
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={
                name === "" || card === "" || expiryDate === "" || cvc === ""
                  ? true
                  : false
              }
            >
              Pay
            </Button>
          </form>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Payment);
