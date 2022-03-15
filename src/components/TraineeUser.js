import React, { Component } from "react";
import { withRouter } from "react-router";


class TraineeUSer extends Component {

  handleSelectedUser = (e) => {
    e.preventDefault();
    this.props.setSelectedUser(this.props.trainee)
  };

  render() {
    const { trainee } = this.props;

    


    return (

       <a href="/home" className="text-reset text-decoration-none my-2 ">

      
        <form className="link list-group-item d-flex justify-content-between align-items-center customerHover" onClick={this.handleSelectedUser}>
        <span className="">
          {trainee.name}
        </span>
      
        <span href="/home" className="badge badge-warning badge-pill stretched-link">
          {trainee.type}
        </span>


        </form>


       
        
        </a> 
      
    );
  }
}

export default withRouter(TraineeUSer);
