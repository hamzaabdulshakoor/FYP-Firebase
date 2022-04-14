import React, { useEffect,useState } from "react";
import Card from "react-bootstrap/Card";
import { CardDeck,DropdownButton,Dropdown } from "react-bootstrap";
import firebase from "../utils/firebase";


import {  withRouter } from "react-router";
import Todo from "./Todo";
import DisplayTodo from "./DisplayTodo";


function Program (props) {   

  const [week, setWeek] = useState("WK1")
  const [sundayTasks, setSundayTasks] = useState([])
  const [sundayFeedback, setSundayFeedback] = useState([])
  const [mondayFeedback, setMondayFeedback] = useState([])
  const [mondayTasks, setMondayTasks] = useState([])
  const [tuesdayTasks, setTuesdayTasks] = useState([])
  const [wednesdayTasks, setWednesdayTasks] = useState([])
  const [thursdayTasks, setThursdayTasks] = useState([])
  const [fridayTasks, setFridayTasks] = useState([])
  const [saturdayTasks, setSaturdayTasks] = useState([])
  const [trainee, setTrainee] = useState('')


  useEffect(() => {
    console.log("week activated me")

    firebase
      .firestore().collection('users').doc(props.trainee.id).get()
        .then(snapshot => {
          setTrainee(snapshot.data())
        
        
        })

    

    if(props.trainee.program){
      if(Object.keys(props.trainee.program).length!==0){
        setSundayTasks(props.trainee.program[week].sunday.tasks)
        setSundayFeedback(props.trainee.program[week].sunday.feedback)
        setMondayTasks(props.trainee.program[week].monday.tasks)
        setMondayFeedback(props.trainee.program[week].monday.feedback)
        setTuesdayTasks(props.trainee.program[week].tuesday.tasks)
        setWednesdayTasks(props.trainee.program[week].wednesday.tasks)
        setThursdayTasks(props.trainee.program[week].thursday.tasks)
        setFridayTasks(props.trainee.program[week].friday.tasks)
        setSaturdayTasks(props.trainee.program[week].saturday.tasks)
      }
    }
    
  
  },[props.trainee.id,week])
  
  const handleChangeWeek = (e)=>{
    e.preventDefault();
    setWeek(e.target.value)
  }


  const saveWeek = () => {
   
    firebase
      .firestore()
      .collection("users")
      .doc(props.trainee.id)
      .update({
        program:{
          ...props.trainee.program,
          [week]: {
            ...props.trainee.program[week],
            sunday:{tasks:sundayTasks,feedback: sundayFeedback},
            monday:{tasks:mondayTasks,feedback: mondayFeedback},
            // tuesday:{tasks:tuesdayTasks,feedback: Array(tuesdayTasks.length).fill("")},
            // wednesday:{tasks:wednesdayTasks,feedback: Array(wednesdayTasks.length).fill("")},
            // thursday:{tasks:thursdayTasks,feedback: Array(thursdayTasks.length).fill("")},
            // friday:{tasks:fridayTasks,feedback: Array(fridayTasks.length).fill("")},
            // saturday:{tasks:saturdayTasks,feedback: Array(saturdayTasks.length).fill("")},
          }

        }
      })
      .then(() => {
        alert("User edited successfully");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

 

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
      <Card className="center">
        <Card.Body>
        <select onChange={handleChangeWeek}>
        {Object.keys(props.trainee.program).sort().map((p,i)=><option key={i} value={p}>{p}</option>)} 
          
        </select>
       
          <Card.Header>Let's Start The Journey - <button onClick={saveWeek}>Save edited week</button></Card.Header>

          <CardDeck>
          <Todo list={sundayTasks} editList={setSundayTasks} day="Sunday"/>     
          <DisplayTodo list={sundayFeedback} day="Feedback"/>     

          
             
          </CardDeck>
          <CardDeck>
          <DisplayTodo list={mondayTasks} day="Monday"/>     
          <DisplayTodo list={tuesdayTasks} day="Feedback"/>    
            
          </CardDeck>


          {/* <DisplayTodo list={wednesdayTasks} day="Wednesday"/>     
          <DisplayTodo list={thursdayTasks} day="Thursday"/>     
          <DisplayTodo list={fridayTasks} day="Friday"/>     
          <DisplayTodo list={saturdayTasks} day="Saturday"/>    */}
        </Card.Body>
      </Card>
    
    )
     
  
  
}

export default withRouter(Program)
