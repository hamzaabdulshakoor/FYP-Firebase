import React, { Component } from "react";
import { Redirect } from "react-router";
import Nav from "./Nav";
import SearchForm from "./SearchForm";
import { CardDeck } from "react-bootstrap";
import Chat from "./ChatUserList";
import ChatBox from "./ChatBox";
import Messages from "./Messages";
import ChatUserList from "./ChatUserList";

export default class Home extends Component {

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

          <ChatUserList user={this.props.user} users={this.props.users} setSelectedUser={this.setSelectedUser}/>
          <ChatBox user={this.props.user} users={this.props.users} receiver={this.state.selectedUser}/>
        </CardDeck>
      </div>
    );
  }
}
