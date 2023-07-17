import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';
import styled from 'styled-components'
import InfoIcon from '@mui/icons-material/Info';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import Chatinput from './Chatinput';
import {  useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import Msg from './Msg';
import Notes from './Notes';
function Chats() {
    const chatref=useRef(null);
    const roomid = useSelector(selectRoomId);
    const [roomdetails,loading]=useDocument(
        roomid&& doc(db, 'rooms',roomid)
    );
    const [roommsgs,setroommsgs]=useState([]);
    useEffect(() => {
        if(roomid){
            const msgColl = query(collection(db, "rooms", roomid, "meassages"), orderBy("timestamp","asc"));
            onSnapshot(msgColl, (querySnapshot) => {
                setroommsgs(querySnapshot.docs.map(msg => msg.data()))
            });
        }
        
    }, [roomid])

     useEffect(() => {
        console.log("chat ref here",chatref)
       chatref?.current?.scrollIntoView({
        behavior: "smooth",
        
       });
       
     }, [roomid,loading]) 
return(
    
    <Chatcointer> 
        {roomdetails&&roommsgs&&(
            <>
            <Header>
                <Headerleft>
                    <h4>
                        <strong>
                            #{roomdetails?.data().name}
                        </strong>
                    </h4>
                    <StarBorderIcon/>
                    <Notes/>
                </Headerleft>
                <Headrright>
            
                    <InfoIcon/>
                </Headrright>
            </Header>
            <Chatmessages>
           
             {roommsgs?.map((doc)=>(

           <Msg key={doc.id} msg1={doc.meassage} img1={doc.userimage} user={doc.user} time={doc.timestamp} url={doc.url} 
           filename={doc.filename}/>
         ))}
                
                <Chatinput  channelName={roomdetails?.data().name} channelId={roomid} chatRef={chatref}>
                </Chatinput>
                <Chatbottom ref={chatref}>
    
                </Chatbottom>
            </Chatmessages>
            </>
        )}
        
    </Chatcointer>
)}
export default Chats
const Chatcointer=styled.div`
flex:0.8;
flex-grow:1;
overflow:scroll;
margin-top:60px;
background-color: #DCDCDC;
padding: 20px;
`
;
const Header=styled.div`
display: flex;
justify-content:space-between;
padding: 20px;
border-bottom: 1px solid black;

`;
const Headerleft=styled.div`
display: flex;
align-items: center;
>h4{
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
}
>p{
    display: flex;
    align-items: center;
    font-size: 14px;
}
>h4 .MuiSvgIcon-root{
    margin-left: 10px;
    font-size: 18px;
}
`;
const Headrright=styled.div``;
const Chatmessages=styled.div`

`;
const Chatbottom=styled.div``;
