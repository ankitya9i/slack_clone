import React, {  useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import {auth, db} from "../firebase";
import SendIcon from '@mui/icons-material/Send';
import { addDoc, collection, serverTimestamp} from "firebase/firestore"; 
import { useAuthState } from 'react-firebase-hooks/auth';
import BasicModal from './uploadfile'
function Chatinput({channelName, channelId,chatRef}){
    const [user] = useAuthState(auth);
    console.log(channelId);
    const [input,Setinput]=useState('');
    const sendMessage = (e) => {
        e.preventDefault();
        try{
            addDoc(collection(db, "rooms",channelId,"meassages"),{
                meassage:input,
                user:user.displayName,
              userimage:user?.photoURL,
              timestamp: serverTimestamp()
              })}
        catch(err){
            console.log(err,'Please');
        }

        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
           
          })
          Setinput("")
    }
  return (
    <Chatinputcointainer>
    
    <form>
        <BasicModal chatref={chatRef}/>
        <input value={input} type="text" placeholder={`message to ${channelName}`} onChange={(e)=>Setinput(e.target.value)} />
        <Button type='Submit' hidden onClick={sendMessage} >Send</Button>
        {input? <SendIcon color='primary' fontSize='large' hidden onClick={sendMessage}/>
        :<div></div>}
        
    </form>
    </Chatinputcointainer>
  )
}
export default Chatinput
const Chatinputcointainer = styled.div`
border-radius:20px;
display: flex;
justify-content: center;
> form{
    background-color: white !important;
    display:flex;
    justify-content:center;
    align-items: center;
    position:absolute;
    bottom: 30px;
    width:50%;
    border: 1px solid ;
     >input {
        flex: 0.8;
        padding: 20px;
        outline: none;
        border: none;
        overflow: hidden;
        font-size: large;
    }
  > Button{
    display: none !important;
  }
}`;