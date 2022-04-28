import React from "react";
import Card from "react-bootstrap/Card";


// this display is static ie cannot be changed/edited for example trainee cannot edit what they are given
export default function DisplayTodo (props) {

  return (

<Card className="center mb-3 dayCard">
        <Card.Body className="scrollTasks">
          <Card.Header>
            {props.day}
          </Card.Header>


      <div>
        {props.list.map((text, i) => (
          <div
            key={i}
          >
            {text}
          </div>
        ))}
      </div>

        </Card.Body>
        </Card>
        
    
  );
};