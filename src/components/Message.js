import React, { Component } from "react";

export default class Message extends Component {

  render() {
    const { message,users } = this.props;

    const sender = users.filter((u)=>u.id===message.sender.id)[0]
    
    return (

       <div>

{sender.id === this.props.user.id?   <div className="list-group-item d-flex justify-content-between align-items-center border border-dark bg-dark text-light" >


<span className="">
  {sender.name}
</span>


<small className="" >
{message.receivedTime&& message.receivedTime.toDate().toUTCString()}
</small>
</div>       :   <div className="list-group-item d-flex justify-content-between align-items-center border border-dark bg-dark text-light" >
<small className="" >
{message.receivedTime&& message.receivedTime.toDate().toUTCString()}
</small>

<span className="">
  {sender.name}
</span>



</div>     

}

        
        <div className="list-group-item d-flex justify-content-between align-items-center border border-dark bg-light  ">


      

        <span >
        {message.content}
        </span>
   
        </div>        
        </div> 
      
    );
  }
}
