import React, { useEffect,useState } from "react";
import Card from "react-bootstrap/Card";
import firebase from "../utils/firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";


export default function Messages (props) {  
  //position the list to start from bottom

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  const ref = firebase.firestore().collection("messages").orderBy("receivedTime")
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        if((doc.data().sender.id===props.user.id && doc.data().receiver.id===props.receiver) ||(doc.data().sender.id===props.receiver && doc.data().receiver.id===props.user.id)){
          items.push({id:doc.id,...doc.data()});
        }
      });
      setMessages(items)
      setLoading(false);
    });
  }, [props.receiver,props.user.id])
  
  
  if (loading) {
    return <h1>Loading....</h1>;
  }
  return(

    

    
      <Card className="center ">
        <Card.Body className="scroll">

       
          
          <ul className="list-group">
            {messages.map((m) => {
              return <Message key={m.id} message={m} user={props.user} users={props.users} />;
            })}
          </ul>

      
        </Card.Body>

        <Card.Footer>
        <SendMessage user={props.user} receiver={props.receiver}/>
        </Card.Footer>
      </Card>
  
  )
}
