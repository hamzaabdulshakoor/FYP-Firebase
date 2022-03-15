import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ChatUser from "./ChatUser";

export default class ChatUserList extends Component {
 
  render() {
    return (
      <Card className="center">
        <Card.Body className="scroll">
          <Card.Header>
            Chat
          </Card.Header>
          <ul className="list-group">
            {this.props.users.filter(u=>u.id!==this.props.user.id).map((u) => {
              return <ChatUser key={u.id} chatee={u} setSelectedUser={this.props.setSelectedUser} />;
            })}
          </ul>
        </Card.Body>
      </Card>
    );
  }
}
