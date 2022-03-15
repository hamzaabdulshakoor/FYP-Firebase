import React, { Component } from "react";

import { Redirect } from "react-router";
import firebase from "../utils/firebase";
import Nav from "./Nav";
import Room from "./Room";

export default class SearchResult extends Component {
  state = {
    rooms: [],
    loading: true,
  };
  componentDidMount() {
    this.setrooms();
  }

  setrooms = () => {
    const ref = firebase.firestore().collection("rooms");
    this.setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      this.setState({ rooms: items });
      this.setLoading(false);
    });
  };

  setLoading = (bool) => {
    this.setState({ loading: bool });
  };

  render() {
    const { rooms } = this.state;
    const { user, priceMultiplier, checkInDate, checkOutDate } = this.props;
    if (this.props.user === null) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <Nav user={user} />
        {rooms.map((room) => {
          return (
            <Room
              key={room.title}
              room={room}
              priceMultiplier={priceMultiplier}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          );
        })}
      </div>
    );
  }
}
