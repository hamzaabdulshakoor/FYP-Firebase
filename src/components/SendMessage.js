import React, { Component } from 'react'
import firebase from "../utils/firebase";

export default class SendMessage extends Component {

    state={
        message:""
    }

    handleMessage = (e) => {
        this.setState(() => ({
          message: e.target.value,
        }));
      };

    send = (e) => {
    e.preventDefault();
    // Add a new document in collection "users"
    // ADD CHECKING FOR DUPLICATE NAMES
    firebase
    .firestore()
    .collection("messages")
    .doc()
    .set({
        content:this.state.message,
        sender:firebase.firestore().collection('users').doc(this.props.user.id),
        receiver:firebase.firestore().collection('users').doc(this.props.receiver),
        receivedTime:firebase.firestore.FieldValue.serverTimestamp()})
    .then(() => {
        this.setState(() => ({
            message: "",
          }));
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });


    };
    
  render() {
    return (
        <form className='d-block my-2' onSubmit={this.send}>
          <textarea
                placeholder=""
                className='CustomTextArea justify-content-between align-items-center'
                value={this.state.message}
                onChange={this.handleMessage}
              />      
              
        <button type="submit" className='btn-sm btn-success float-right '>Send</button>
      </form>
    )
  }
}
