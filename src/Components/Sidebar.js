import React from 'react'
import { db } from '../firebase';
import { collection } from 'firebase/firestore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import styled from 'styled-components'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Sidebarptions from './Sidebarptions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { useCollection } from 'react-firebase-hooks/firestore';
function Sidebar({user}) {
    const [value, loading, error] = useCollection(
        collection(db, 'rooms')
      );
     console.log(value);
  return (
   <Sidebarbox>
    <Side>
        <SidebarInfo>
            <h3><FiberManualRecordIcon/>{user.displayName}</h3>
        </SidebarInfo>
    </Side>
   
    <Sidebarptions Icon={InsertCommentIcon} title="Drafts And send"/>
    <Sidebarptions Icon={InboxIcon} title="Connect"/>
    <Sidebarptions Icon={DraftsIcon} title="Browse project"/>
    <Sidebarptions Icon={BookmarkBorderIcon} title="hello everyone"/>
    <Sidebarptions Icon={PeopleAltIcon} title="hello everyone"/>
    <Sidebarptions Icon={AppsIcon} title="hello everyone"/>
    <Sidebarptions Icon={FileCopyIcon} title="hello everyone"/>
    <Sidebarptions Icon={ExpandLessIcon} title="hello everyone"/>
    <Sidebarptions Icon={ExpandMoreIcon} title="channels"/>
    <Sidebarptions Icon={ExpandLessIcon} title="Add channel" addchanneloption={1}/>
    
   <hr/>
   {value?value.docs.map((doc)=>(
    <Sidebarptions key={doc.id} Icon={AddIcon} title={doc.data().name} id={doc.id} />
   )):<div>Hello</div> }
   </Sidebarbox> // will call channel a room fopr this is the 
  )
}

export default Sidebar
const Sidebarbox=styled.div`
    color: white;
    margin-top: 6vh;
    background-color: gray;
    border: 1 px solid black;
    padding: 4px;
    flex:0.2;
    max-width: 20vw;


    overflow: hidden;
    overflow-y: auto;

    >hr{
       margin-top: 10px;
       margin-bottom: 10px;
       border: 1px solid black;
    }
        `;

const Side=styled.div`
display: flex;
border-bottom: 1px solid #49274b;
padding:13px;
> .MUiSvgIcon-root {
    padding: 8px;
    color: black;
    background-color: white;
    border-radius: 999px;
}
`;
const SidebarInfo=styled.div`
flex: 1;
>h2{
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
}
    >h3{
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }
>h3 >.MuiSvgIcon-root{
    font-size: 14px;
    margin-top: 1px;
    margin-right:2px;
    color: green;
}
`;