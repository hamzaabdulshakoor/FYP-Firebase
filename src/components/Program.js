import React, { useEffect,useState } from "react";
import Card from "react-bootstrap/Card";
import { CardDeck} from "react-bootstrap";
import firebase from "../utils/firebase";
import {  withRouter } from "react-router";
import Todo from "./Todo";
import DisplayTodo from "./DisplayTodo";


function Program (props) {   

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
    e.preventDefault()
   
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
          <select  onChange={handleChangeWeek}>
          <option value="">Select week</option>
          {trainee && Object.keys(trainee.program).sort().map((p,i)=><option key={i} value={p}>{p}</option>)} 
            
          </select>
         
            <Card.Header>Let's Start The Journey - <button onClick={saveWeek}>Save edited week</button></Card.Header>
  
            <CardDeck>
            <Todo list={sundayTasks} editList={setSundayTasks} day="Sunday"/>     
            <DisplayTodo list={sundayFeedback} day="Feedback"/>               
            </CardDeck>

            <CardDeck>
            <Todo list={mondayTasks} editList={setMondayTasks} day="Monday"/>     
            <DisplayTodo list={mondayFeedback} day="Feedback"/>           
            </CardDeck>

            <CardDeck>
            <Todo list={tuesdayTasks} editList={setTuesdayTasks} day="Tuesday"/>     
            <DisplayTodo list={tuesdayFeedback} day="Feedback"/>           
            </CardDeck>

            <CardDeck>
            <Todo list={wednesdayTasks} editList={setWednesdayTasks} day="Wednesday"/>     
            <DisplayTodo list={wednesdayFeedback} day="Feedback"/>           
            </CardDeck>

            <CardDeck>
            <Todo list={thursdayTasks} editList={setThursdayTasks} day="Thursday"/>     
            <DisplayTodo list={thursdayFeedback} day="Feedback"/>           
            </CardDeck>

            <CardDeck>
            <Todo list={fridayTasks} editList={setFridayTasks} day="Friday"/>     
            <DisplayTodo list={fridayFeedback} day="Feedback"/>           
            </CardDeck>
  
            <CardDeck>
            <Todo list={saturdayTasks} editList={setSaturdayTasks} day="Saturday"/>     
            <DisplayTodo list={saturdayFeedback} day="Feedback"/>           
            </CardDeck>
  
  
           
          </Card.Body>
        </Card>
      
      )
  
  
}

export default withRouter(Program)
