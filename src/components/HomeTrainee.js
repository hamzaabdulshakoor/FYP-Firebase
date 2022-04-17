import React from "react";
import Nav from "./Nav";
import ProgramTrainee from "./ProgramTrainee";


export default function HomeTrainee (props) {

    return (
      <div>
        <Nav user={props.user} />
        <ProgramTrainee user={props.user} trainee={props.user}/>
      </div>
    );
  
}
