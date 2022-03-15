import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import firebase from "../utils/firebase";
import Reservation from "./Reservation";

export default class Reservations extends Component {
  state = {
    reservations: [],
    loading: true,
  };
  componentDidMount() {
    this.setReservations();
  }

  setReservations = () => {
    const ref = firebase
      .firestore()
      .collection("reservations")
      .where("user_email", "==", this.props.user.email);
    this.setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });

      this.setState({ reservations: items });
      this.setLoading(false);
    });
  };

  setLoading = (bool) => {
    this.setState({ loading: bool });
  };
  render() {
    if (this.state.loading) {
      return (
        <Card className="center">
          <Card.Body>
            <Card.Header>Loading...</Card.Header>
            <ul className="list-group"></ul>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Card className="center">
        <Card.Body>
          <Card.Header>
            Current Reservations: {this.state.reservations.length}
          </Card.Header>
          <ul className="list-group">
            {this.state.reservations.map((r) => {
              return <Reservation key={r.id} reservation={r} />;
            })}
          </ul>
        </Card.Body>
      </Card>
    );
  }
}
