import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import firebase from "../utils/firebase";
import ChatUser from "./ChatUser";
import Message from "./Message";
import Reservation from "./Reservation";
import SendMessage from "./SendMessage";
import ReactScrollableList from "react-scrollable-list"


export default class Messages extends Component {  
  //position the list to start from bottom

  state = {
    messages: [],
    loading: false,
  };
  componentDidMount() {
    this.setMessages();
  }


  setMessages = () => {
    const ref = firebase.firestore().collection("messages").orderBy("receivedTime")
    this.setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        if(doc.data().sender.id===this.props.user.id && doc.data().receiver.id===this.props.receiver){
          items.push({id:doc.id,...doc.data()});
        }else if(doc.data().sender.id===this.props.receiver && doc.data().receiver.id===this.props.user.id){
          items.push({id:doc.id,...doc.data()});
        }
      });
      this.setState({ messages: items });
      this.setLoading(false);
    });
  };

  setLoading = (bool) => {
    this.setState({ loading: bool });
  };

  
  render() {

    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <Card className="center ">
        <Card.Body className="scroll">

       
          
          <ul className="list-group">
            {this.state.messages.map((m) => {
              return <Message key={m.id} message={m} user={this.props.user} users={this.props.users} />;
            })}
          </ul>

      
        </Card.Body>

        <Card.Footer>
        <SendMessage user={this.props.user} receiver={this.props.receiver}/>
        </Card.Footer>
      </Card>
    );
  }
}
