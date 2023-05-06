import React from 'react'
import styled from 'styled-components';
import { db } from '../firebase';
import {useDispatch} from 'react-redux';
import { collection, addDoc } from "firebase/firestore"; 
import { enterRoom } from '../features/appSlice';
function Sidebarptions({Icon,title,addchanneloption,id}){
const dispatch=useDispatch();
  const addchannel = () => {
   const channelname=prompt("please entre the channel name");
   if(channelname){
    try {
      addDoc(collection(db, "rooms"), {
        name: channelname,
      });
      console.log("Document written with ID: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }}
  const selectchannel = () => {
    if(id){
      
      dispatch(enterRoom({
        roomId:id,
      }
      ))
    }
  }
  return (
    
      <Sidebarptionscontainer
        onClick={addchanneloption ? addchannel:selectchannel}>
      {Icon && <Icon fontSize='small' styled={{padding:10}}/>}
      {Icon ?(
        <h3>
          {title}
        </h3>
      ):(
      <Sidebarptionschannel>
        <span>

        </span>
      </Sidebarptionschannel>
      )
      }
      </Sidebarptionscontainer>
    
  )
}

export default Sidebarptions
const Sidebarptionscontainer =styled.div`
margin: 4px;
display:flex;
font-size: 14px;
padding: 5px;
align-items:center;
padding-left:2px;
cursor: pointer;
:hover{
  opacity: 0.9;
  background-color:black;
}
>h3{
  padding-left: 10px;
  font-weight:500;
}
>h3 >span{
  padding:15px;
}
`;
const Sidebarptionschannel =styled.div`
  padding: 10px 0;
  font-weight:300;
  `;