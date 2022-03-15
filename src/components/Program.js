import React, { useEffect,useState } from "react";
import Card from "react-bootstrap/Card";

import {  withRouter } from "react-router";


function Program (props) {   

  const handleAvailability = () => {
    const page = `/create/${props.trainee.id}`;
    return props.history.push(page);
  }
  if(!props.trainee.id){
    return  <Card className="center ">
    <Card.Body className="">
      <h1>Please select a user to Track</h1>  
    </Card.Body>
  </Card>
  }else if(Object.keys(props.trainee.program).length===0){
      return <Card className="center ">
      <Card.Body className="">
        <h1>This user doesn't have a live program</h1>  
        <button onClick={handleAvailability}>Create</button>  
      </Card.Body>
    </Card>
  }

    return(
      <Card className="center ">
      <Card.Body className="">
        <h1>Program will show here</h1>  
        {console.log(props.trainee)}
      </Card.Body>
    </Card>
    
    )
     
  
  
}

export default withRouter(Program)
