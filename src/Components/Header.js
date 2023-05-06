import React from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Sidebarptions from './Sidebarptions'; 
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import MailIcon from '@mui/icons-material/Mail';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Avatar from '@mui/material/Avatar';
function Header() {
  const [user,loading] = useAuthState(auth);
  return (
    <HeaderCointainer>
      <Headerlft>
      <Avatar onClick={()=>auth.signOut()} alt="Remy Sharp" src={user?.photoURL} 
       fontSize='large'/>
      <AccessTimeIcon/>
      </Headerlft>
      <Headresearch>
        <SearchIcon/>
        <input />
      </Headresearch>
      <HRight>
      <HelpOutlineIcon fontSize='large'/>
      </HRight>
    </HeaderCointainer>
  )
}

export default Header

const HeaderCointainer =styled.div`
display: flex;
position: fixed;
width: 100%;
align-items: center;
padding: 10px;
background-color: var(--slack-color);
`;
const Headerlft =styled.div`

flex: 0.2;
display: flex;
align-items: center;
color:white;

> .MuiSvgIcon-root {
  margin-left:auto;
  margin-right: 30px;
  padding:10px 0;
}

> .MuiSvgIcon-root:hover{
 cursor: pointer;

}
`;
const Headresearch=styled.div`
flex: 0.4;
display: flex;
border: 2px solid black;
border-radius:6px;
align-items: center;
padding:1vh 1vh 1vh 1vh;
justify-content: center;
>input{
  background-color: transparent;
  border: none;
  min-width:30vw;
  outline: none;
  text-align:center;
  color: white;
  font-size: large;
}
`;
const HRight =styled.div`
flex: 0.3;
display: flex;
> .MuiSvgIcon-root{
margin-left: auto;
margin-right: 20px; 

}
:hover{
  opacity: 0.8;
}
`;
