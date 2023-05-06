import React, { useEffect, useRef } from 'react'
import { db } from '../firebase';
import styled from 'styled-components'
import InfoIcon from '@mui/icons-material/Info';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import Chatinput from './Chatinput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc } from 'firebase/firestore';
import Msg from './Msg';
import {img1} from './img11.png';
function Chats() {
    const chatref=useRef(null);
    const roomid = useSelector(selectRoomId);
    const [roomdetails]=useDocument(
        roomid&& doc(db, 'rooms',roomid)
    );
    console.log(roomdetails?.data().name);
    const [roommsgs,loading]=useCollection(
        roomid && collection(db, 'rooms',roomid,'meassages')
    );
     useEffect(() => {
       chatref?.current?.scrollIntoView();
     }, [roomid,loading]) 
    console.log(chatref.current,"ueref")
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
                </Headerleft>
                <Headrright>
            
                    <InfoIcon/>
                </Headrright>
            </Header>
            <Chatmessages>
           
             {roommsgs?.docs.map((doc)=>(
           <Msg key={doc.id} msg1={doc.data().meassage} img1={doc.data().userimage} user={doc.data().user} />
         ))}
                
              
                <Chatinput chatref={chatref} channelName={roomdetails?.data().name} channelId={roomid}>
               
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
flex:0.3;
flex-grow:1;
overflow:scroll;
margin-top:60px;
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
