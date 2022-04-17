import React, { useState } from "react";

import { Redirect,useHistory  } from "react-router";
import firebase from "../utils/firebase";
import Nav from "./Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CardDeck } from "react-bootstrap";
import Todo from "./Todo";

export default function CreateProgram(props) {

  const history = useHistory();
  const [numOfWeeks, setNumOfWeeks] = useState(1)
  const [sundayTasks, setSundayTasks] = useState([])
  const [mondayTasks, setMondayTasks] = useState([])
  const [tuesdayTasks, setTuesdayTasks] = useState([])
  const [wednesdayTasks, setWednesdayTasks] = useState([])
  const [thursdayTasks, setThursdayTasks] = useState([])
  const [fridayTasks, setFridayTasks] = useState([])
  const [saturdayTasks, setSaturdayTasks] = useState([])

  const handleWeeks=(e)=>{
    setNumOfWeeks(e.target.value)
  }

  const insertProgramToFirebase = (newProgram) => {
    firebase
      .firestore()
      .collection("users")
      .doc(props.traineeID)
      .update({
        program:newProgram,
        trainer: firebase.firestore().collection('users').doc(props.user.id)
      })
      .then(() => {
        alert("User edited successfully");
        return history.push("/home");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  const handleCreation =(e)=>{
    e.preventDefault();
    let program = {}
    for (let i = 1; i <=numOfWeeks; i++) {
      program={...program,[`WK${i}`]:{
        sunday:{tasks:sundayTasks,feedback: Array(sundayTasks.length).fill("")},
        monday:{tasks:mondayTasks,feedback: Array(mondayTasks.length).fill("")},
        tuesday:{tasks:tuesdayTasks,feedback: Array(tuesdayTasks.length).fill("")},
        wednesday:{tasks:wednesdayTasks,feedback: Array(wednesdayTasks.length).fill("")},
        thursday:{tasks:thursdayTasks,feedback: Array(thursdayTasks.length).fill("")},
        friday:{tasks:fridayTasks,feedback: Array(fridayTasks.length).fill("")},
        saturday:{tasks:saturdayTasks,feedback: Array(saturdayTasks.length).fill("")},
       
      }}
    }
    insertProgramToFirebase(program);
  }


  if (props.user === null) {
    return <Redirect to={{ pathname: "/login" }} />;
  }
    return (
      <div>
        <Nav user={props.user} />

        <Card className="center">
        <Card.Body>
          <Card.Header>Let's Start The Journey</Card.Header>

          <CardDeck>
          <Todo list={sundayTasks} editList={setSundayTasks} day="Sunday"/>     
          <Todo list={mondayTasks} editList={setMondayTasks} day="Monday"/>     
          <Todo list={tuesdayTasks} editList={setTuesdayTasks} day="Tuesday"/>     
          </CardDeck>
          <CardDeck>
          <Todo list={wednesdayTasks} editList={setWednesdayTasks} day="Wednesday"/>     
          <Todo list={thursdayTasks} editList={setThursdayTasks} day="Thursday"/>     
          <Todo list={fridayTasks} editList={setFridayTasks} day="Friday"/>     
          <Todo list={saturdayTasks} editList={setSaturdayTasks} day="Saturday"/>     
          </CardDeck>


          <form className="d-block my-2" onSubmit={handleCreation} >
            <div>
              <span className="h2" style={{ color: "#00C8FF" }}>
                Number of weeks
              </span>
            </div>
            <div className="my-2">
              <input
                className=""
                type="number"
                value={numOfWeeks}
                onChange={handleWeeks}
              />
            </div>


          
            <Button
              variant="primary"
              type="submit"
            >
              Create Program
            </Button>
          </form>


        </Card.Body>
      </Card>
      </div>
    );
}


