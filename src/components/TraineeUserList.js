import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import TraineeUser from "./TraineeUser";

export default class TraineeUserList extends Component {
 
  render() {
    return (
      <Card className="center">
        <Card.Body className="scroll">
          <Card.Header>
            Trainees
          </Card.Header>
          <ul className="list-group">
            {this.props.users.map((u) => {
              return <TraineeUser key={u.id} trainee={u} setSelectedUser={this.props.setSelectedUser} selectedUser={this.props.selectedUser} />;
            })}
          </ul>
        </Card.Body>
      </Card>
    );
  }
}
