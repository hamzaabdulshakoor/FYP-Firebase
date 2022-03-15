import React from "react";
import TodoForm from "./TodoForm";
import Card from "react-bootstrap/Card";


export default function Todo (props) {

  return (

<Card className="center mb-3 dayCard">
        <Card.Body className="scrollTasks">
          <Card.Header>
            {props.day}
          </Card.Header>
          <TodoForm
        onSubmit={text => props.editList([text, ...props.list])}
      />

    <button className="mx-2" onClick={() => props.editList([])}>reset</button>

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