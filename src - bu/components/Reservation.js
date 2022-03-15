import React, { Component } from "react";
import firebase from "../utils/firebase";

export default class Reservation extends Component {
  deleteReservationToFirebase = () => {
    // eslint-disable-next-line no-restricted-globals
    const flag = confirm("Are you sure you want to cancel this reservation?");
    if (flag) {
      firebase
        .firestore()
        .collection("reservations")
        .doc(this.props.reservation.id)
        .delete()
        .then(() => {
          alert("Reservation deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
        });
    }
  };

  render() {
    const { reservation } = this.props;
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <span className="border-right border-danger pr-1 mr-1">
          {reservation.room}
        </span>
        <span className="badge badge-primary badge-pill">
          In: {reservation.checkInDate}
        </span>
        <span className="badge badge-primary badge-pill">
          Out: {reservation.checkOutDate}
        </span>

        <span className="badge badge-primary badge-pill">
          {reservation.Nights} {reservation.Nights > 1 ? "nights" : "night"}
        </span>
        <span
          className="btn badge badge-danger badge-pill"
          onClick={this.deleteReservationToFirebase}
        >
          Cancel
        </span>
      </li>
    );
  }
}
