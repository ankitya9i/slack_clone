import React, { useState } from 'react'
import  { useRef } from "react";
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
import { auth, db } from '../firebase';
import Avatar from '@mui/material/Avatar';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import CloseIcon from '@mui/icons-material/Close';
import { enterRoom } from '../features/appSlice';
import { useDispatch } from 'react-redux';
import AccountMenu from './Account'
import emailjs from "@emailjs/browser";
import Sendmail from './Sendmail'
import './Header.css'
function Header() {
  const [wordEntered, setWordEntered] = useState("");
  const [user,loading] = useAuthState(auth);
  const [roomdetails]=useCollection(collection(db, 'rooms')
 
);
const dispatch=useDispatch();
const [filteredData, setFilteredData] = useState([]);

const handleFilter = (event) => {

  const searchWord = event.target.value;
  setWordEntered(searchWord);
  const newFilter = roomdetails?.docs.filter((value) => {
    return value.data().name.toLowerCase().includes(searchWord.toLowerCase());
  });

  if (searchWord === "") {
    setFilteredData([]);
  } else {
    setFilteredData(newFilter);
  }
};
const clearInput = () => {
  setFilteredData([]);
  setWordEntered("");
};
const selectchannel = (id) => {
  console.log("select channel")
  
  if(id){
    setFilteredData([]);
    setWordEntered("")
    dispatch(enterRoom({
      roomId:id,
    }
    ))
  }
}
  return (
    <HeaderCointainer>
      <Headerlft>

      <AccountMenu/>

      <AccessTimeIcon/>
      </Headerlft>
      <Headresearch>
      <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
        <input type="text"
          placeholder='Search channels By name'
          value={wordEntered}
          onChange={handleFilter}/>
      </Headresearch>
      <HRight>
      <HelpOutlineIcon fontSize='large'/>
      <Sendmail/>
      {/* var code now */}
      
    {/* <Contact/> */}
      </HRight>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value) => {
            return (
              
               
              <div className='dataItem'  onClick={()=>selectchannel(value.id)}>
                 <p>{value.data().name} </p>
              </div>
                
            );
          })}
        </div>
      )}
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

flex: 0.18;
display: flex;
align-items: center;
justify-content: space-between;
color:white;

> .MuiSvgIcon-root {

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
> input::placeholder{
  color: black;
  opacity: 0.4;
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
