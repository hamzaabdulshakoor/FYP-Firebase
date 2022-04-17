import React, { Component } from "react";
import { withRouter } from "react-router";


class ChatUser extends Component {

  handleSelectedUser = (e) => {
    e.preventDefault();
    this.props.setSelectedUser({id:this.props.chatee.id})
  };

  render() {
    const { chatee,selectedUser } = this.props;
    console.log(chatee.id)
    console.log(selectedUser.id)
    


    return (

       <a href="/home" className="text-reset text-decoration-none my-2 ">

       {chatee.id === selectedUser.id? <form className="link list-group-item d-flex justify-content-between align-items-center customerHover bg-info" onClick={this.handleSelectedUser}>
        <span className="">
          {chatee.name}
        </span>
      
        <span href="/home" className="badge badge-warning badge-pill stretched-link">
          {chatee.type}
        </span>


        </form>:<form className="link list-group-item d-flex justify-content-between align-items-center customerHover" onClick={this.handleSelectedUser}>
        <span className="">
          {chatee.name}
        </span>
      
        <span href="/home" className="badge badge-warning badge-pill stretched-link">
          {chatee.type}
        </span>


        </form> } 
        


       
        
        </a> 
      
    );
  }
}

export default withRouter(ChatUser);
