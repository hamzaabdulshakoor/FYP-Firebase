import React, { Component,useState,useEffect } from "react";
import { Redirect } from "react-router";
import Nav from "./Nav";
import { CardDeck } from "react-bootstrap";
import ChatBox from "./ChatBox";
import ChatUserList from "./ChatUserList";
import TraineeUserList from "./TraineeUserList";
import firebase from "../utils/firebase";
import Program from "./Program";


export default function Home (props) {

  const [selectedUser, setSelectedUser] = useState({})
  const [trainees, setTrainees] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const ref = firebase.firestore().collection("users").where("type","==","trainee")
      setLoading(true);
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {

          if(doc.data().trainer==="" || doc.data().trainer.id===props.user.id)
         
            items.push({id:doc.id,...doc.data()});
          
        });
        setTrainees(items)
        setLoading(false);
      });
    },[])

 
    if (props.user === null) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    if (loading) {
      return <h1>Loading....</h1>;
    }

    return (
      <div>
        <Nav user={props.user} />
        <TraineeUserList user={props.user} users={trainees} setSelectedUser={setSelectedUser}/>
        <Program user={props.user} users={props.users} trainee={selectedUser}/>
      </div>
    );
  
}
