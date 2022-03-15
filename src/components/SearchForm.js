import React, { Component } from "react";
import { withRouter } from "react-router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class SearchForm extends Component {
  state = {
    checkInDate: "",
    checkOutDate: "",
    toHome: false,
  };

  handleDate = (e) => {
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  getPriceMultiplier = () => {
    const { checkInDate, checkOutDate } = this.state;
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    const priceMultiplier = (outDate.getTime() - inDate.getTime()) / 8.64e7; // millisecond to day
    return parseInt(priceMultiplier);
  };

  handleAvailability = (e) => {
    e.preventDefault();
    const { checkInDate, checkOutDate } = this.state;

    let priceMultiplier = this.getPriceMultiplier() + 1;
    if (priceMultiplier < 1) {
      alert("Check Out cannot be before check in");
    } else {
      let page = `/result/${checkInDate}/${checkOutDate}/${priceMultiplier}`;

      return this.props.history.push(page);
    }
  };
  render() {
    const { checkInDate, checkOutDate } = this.state;
    return (
      <Card className="center">
        <Card.Body>
          <Card.Header>Let's Start The Journey</Card.Header>

          <form className="d-block my-2" onSubmit={this.handleAvailability}>
            <div>
              <span className="h2" style={{ color: "#00C8FF" }}>
                {" "}
                Check In
              </span>
            </div>
            <div className="my-2">
              <input
                className=""
                type="date"
                name="checkInDate"
                value={checkInDate}
                onChange={this.handleDate}
              />
            </div>

            <div>
              <span className="h2" style={{ color: "#00C8FF" }}>
                {" "}
                Check Out
              </span>
            </div>
            <div className="my-2">
              <input
                className=""
                type="date"
                name="checkOutDate"
                value={checkOutDate}
                onChange={this.handleDate}
              />
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={
                checkInDate === "" || checkOutDate === "" ? true : false
              }
            >
              Check Availability
            </Button>
          </form>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(SearchForm);
