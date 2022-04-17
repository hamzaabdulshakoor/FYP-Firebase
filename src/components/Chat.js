import React, { Component } from "react";
import { Redirect } from "react-router";
import Nav from "./Nav";
import { CardDeck } from "react-bootstrap";
import ChatBox from "./ChatBox";
import ChatUserList from "./ChatUserList";

export default class Chat extends Component {

  state={
    selectedUser: {}
  }

  setSelectedUser=(userToChat)=>{
    this.setState(() => ({
      selectedUser: userToChat,
    }));
  }
  render() {
    if (this.props.user === null) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
      <div>
        <Nav user={this.props.user} />
        <CardDeck>

          <ChatUserList user={this.props.user} users={this.props.users} setSelectedUser={this.setSelectedUser} selectedUser={this.state.selectedUser}/>
          <ChatBox user={this.props.user} users={this.props.users} receiver={this.state.selectedUser}/>
        </CardDeck>
      </div>
    );
  }
}
