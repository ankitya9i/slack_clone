import React, {  useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import {auth, db} from "../firebase";
import img1 from './img11.png'

import { addDoc, collection, } from "firebase/firestore"; 
import { useAuthState } from 'react-firebase-hooks/auth';
function Chatinput({channelName, channelId,chatRef}) {
    const [user,loading] = useAuthState(auth);
    console.log(channelId);
    const [input,Setinput]=useState('');
    const sendMessage = (e) => {
        e.preventDefault();
       
        try{
            addDoc(collection(db, "rooms",channelId,"meassages"),{
                meassage:input,
                user:user.displayName,
              userimage:user?.photoURL,
              })}
        catch(err){
            console.log(err,'Please');
        }
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
           
          })
          Setinput("")
    }
  return (
    <Chatinputcointainer>

    <form>
        <input value={input} type="text" placeholder={`message to ${channelName}`} onChange={(e)=>Setinput(e.target.value)} />
        <Button type='Submit' hidden onClick={sendMessage} >Send</Button>
        
    </form>
    </Chatinputcointainer>
  )
}

export default Chatinput
const Chatinputcointainer = styled.div`
border-radius:20px;
> form{
    position:relative;
    display:flex;
    justify-content:center;

     >input {
        position:fixed;
        bottom: 30px;
        width:60%;
        border: 1px solid ;
        border-radius: 3px;
        padding: 20px;
        outline: none;

    }
  > Button{
    visibility:hidden !important;
  }
}`;