import React, { useEffect,useState } from "react";
import Card from "react-bootstrap/Card";
import { CardDeck } from "react-bootstrap";
import firebase from "../utils/firebase";


import {  withRouter } from "react-router";
import Todo from "./Todo";
import DisplayTodo from "./DisplayTodo";


function ProgramTrainee (props) {   

  const [week, setWeek] = useState("")
  const [sundayTasks, setSundayTasks] = useState([])
  const [sundayFeedback, setSundayFeedback] = useState([])
  const [mondayTasks, setMondayTasks] = useState([])
  const [mondayFeedback, setMondayFeedback] = useState([])
  const [tuesdayTasks, setTuesdayTasks] = useState([])
  const [tuesdayFeedback, setTuesdayFeedback] = useState([])
  const [wednesdayTasks, setWednesdayTasks] = useState([])
  const [wednesdayFeedback, setWedensdayFeedback] = useState([])
  const [thursdayTasks, setThursdayTasks] = useState([])
  const [thursdayFeedback, setThursdayFeedback] = useState([])
  const [fridayTasks, setFridayTasks] = useState([])
  const [fridayFeedback, setFridayFeedback] = useState([])
  const [saturdayTasks, setSaturdayTasks] = useState([])
  const [saturdayFeedback, setSaturdayFeedback] = useState([])
  const [trainee, setTrainee] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if(props.trainee.id){

      firebase
      .firestore().collection('users').doc(props.trainee.id).get()
        .then(snapshot => {
          setTrainee(snapshot.data())

          if(trainee){
            if(trainee.program){
              if(Object.keys(trainee.program).length!==0){
                if(week!==""){
                setLoading(false); 
                
                setSundayTasks(trainee.program[week].sunday.tasks)
                setSundayFeedback(trainee.program[week].sunday.feedback)

                setMondayTasks(trainee.program[week].monday.tasks)
                setMondayFeedback(trainee.program[week].monday.feedback)

                setTuesdayTasks(trainee.program[week].tuesday.tasks)
                setTuesdayFeedback(trainee.program[week].tuesday.feedback)

                setWednesdayTasks(trainee.program[week].wednesday.tasks)
                setWedensdayFeedback(trainee.program[week].wednesday.feedback)

                setThursdayTasks(trainee.program[week].thursday.tasks)
                setThursdayFeedback(trainee.program[week].thursday.feedback)

                setFridayTasks(trainee.program[week].friday.tasks)
                setFridayFeedback(trainee.program[week].friday.feedback)

                setSaturdayTasks(trainee.program[week].saturday.tasks)
                setSaturdayFeedback(trainee.program[week].saturday.feedback)

                }
                
              }

            }
           
          }

            

        })
    }
  
  },[props.trainee.id,week,props.trainee])




  
  const handleChangeWeek = (e)=>{
    e.preventDefault();
    setWeek(e.target.value)
  }


  const saveWeek = (e) => {
   e.preventDefault() // just to stop the page from refreshing
    firebase
      .firestore()
      .collection("users")
      .doc(props.trainee.id)
      .update({
        program:{ 
          ...props.trainee.program, // spread operator is used here because we dont know the number of weeks / no of weeks changes any time 
          [week]: { // this updates whichever week is selected and updates the contents of it
            ...props.trainee.program[week],
            sunday:{tasks:sundayTasks,feedback: sundayFeedback},
            monday:{tasks:mondayTasks,feedback: mondayFeedback},
            tuesday:{tasks:tuesdayTasks,feedback: tuesdayFeedback},
            wednesday:{tasks:wednesdayTasks,feedback: wednesdayFeedback},
            thursday:{tasks:thursdayTasks,feedback: thursdayFeedback},
            friday:{tasks:fridayTasks,feedback: fridayFeedback},
            saturday:{tasks:saturdayTasks,feedback: saturdayFeedback},           
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

 

  if(!props.trainee.id){
    return  <Card className="center ">
    <Card.Body className="">
      <h1>Please select a user to Track</h1>  
    </Card.Body>
  </Card>
  }else if(Object.keys(props.trainee.program).length===0){
      return <Card className="center ">
      <Card.Body className="">
        <h1>Connect with a trainer to get a program!</h1>  
      </Card.Body>
    </Card>
  }

      return(
        <Card className="center">
          <Card.Body>
          <select  onChange={handleChangeWeek}>
            {/* no of options is generated dynamically based on the program bc number of weeks varies */}
          <option value="">Select week</option>
          {trainee && Object.keys(trainee.program).sort().map((p,i)=><option key={i} value={p}>{p}</option>)} 
            
          </select> 
         
            <Card.Header>Let's Start The Journey - <button onClick={saveWeek}>Save edited week</button></Card.Header>
  
            <CardDeck>
            <DisplayTodo list={sundayTasks} day="Sunday"/>     
            <Todo list={sundayFeedback} editList={setSundayFeedback} day="Feedback"/>     
            </CardDeck>

            <CardDeck>
            <DisplayTodo list={mondayTasks} day="Monday"/>     
            <Todo list={mondayFeedback} editList={setMondayFeedback} day="Feedback"/>         
            </CardDeck>
            
            <CardDeck>
            <DisplayTodo list={tuesdayTasks} day="Tuesday"/>     
            <Todo list={tuesdayFeedback} editList={setTuesdayFeedback} day="Feedback"/>         
            </CardDeck>
  
  
            <CardDeck>
            <DisplayTodo list={wednesdayTasks} day="Wednesday"/>     
            <Todo list={wednesdayFeedback} editList={setWedensdayFeedback} day="Feedback"/>         
            </CardDeck>
  
  
            <CardDeck>
            <DisplayTodo list={thursdayTasks} day="Thursday"/>     
            <Todo list={thursdayFeedback} editList={setThursdayFeedback} day="Feedback"/>         
            </CardDeck>
  
  
            <CardDeck>
            <DisplayTodo list={fridayTasks} day="Friday"/>     
            <Todo list={fridayFeedback} editList={setFridayFeedback} day="Feedback"/>         
            </CardDeck>
  
  
            <CardDeck>
            <DisplayTodo list={saturdayTasks} day="Saturday"/>     
            <Todo list={saturdayFeedback} editList={setSaturdayFeedback} day="Feedback"/>         
            </CardDeck>
  
          </Card.Body>
        </Card>
      
      )
   
     
  
  
}

export default withRouter(ProgramTrainee)
