import React, { Component } from "react";
import { withRouter } from "react-router";


class ChatUser extends Component {

  handleSelectedUser = (e) => {
    e.preventDefault();
    this.props.setSelectedUser({id:this.props.chatee.id})
  };

  render() {
    const { chatee } = this.props;

    


    return (

       <a href="/home" className="text-reset text-decoration-none my-2 ">

      
        <form className="link list-group-item d-flex justify-content-between align-items-center customerHover" onClick={this.handleSelectedUser}>
        <span className="">
          {chatee.name}
        </span>
      
        <span href="/home" className="badge badge-warning badge-pill stretched-link">
          {chatee.type}
        </span>


        </form>


       
        
        </a> 
      
    );
  }
}

export default withRouter(ChatUser);
