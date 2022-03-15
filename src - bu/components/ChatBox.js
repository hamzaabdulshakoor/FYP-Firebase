import React, { Component } from "react";
import { withRouter } from "react-router";
import Messages from "./Messages";
import firebase from "../utils/firebase";
import Card from "react-bootstrap/Card";


class ChatBox extends Component {
  state = {
    messages: [],
    loading: false,
    user: null,
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
        if(doc.data().sender.id===this.props.user.id && doc.data().receiver.id===this.props.receiver.id){
          items.push({id:doc.id,...doc.data()});
        }else if(doc.data().sender.id===this.props.receiver.id && doc.data().receiver.id===this.props.user.id){
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
    } else if(!this.props.receiver.id){
      return (

        <Card className="center ">
      <Card.Body className="">
        <h1>Please select a user to chat</h1>  
      </Card.Body>
    </Card>
    );
    }else{

      
      return <Messages user={this.props.user} users={this.props.users} receiver={this.props.receiver.id}/>


    }
   
   
  }
}

export default withRouter(ChatBox);
