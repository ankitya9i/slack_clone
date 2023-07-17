import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth } from '../firebase';
function Msg({msg1,img1,user,time,url,filename}) {
  const [User,loading] = useAuthState(auth);
  console.log(User.displayName)
  const val= User.displayName==user;
  console.log(val)
  return (
    <Msgcointainer  style={ !val?{justifyContent:'end'}:{}}>
      <img src={img1} alt=''/>
        <MessageInfo >
        <h4>
          {user}
          <span>
          {new Date(time?.toDate()).toUTCString()}
          </span>
        </h4>
        {url?<p>
          File:
          <a href={url}>{filename? filename:<div>File does not</div>}</a>
        </p>:<p>
          {msg1}
        </p>}
        </MessageInfo>
    </Msgcointainer>
  )
}
export default Msg
const Msgcointainer=styled.div`
display: flex;
align-items: center;
padding: 20px;
>img{
  height: 50px;
  border-radius: 8px;
}
`;
const MessageInfo=styled.div`
padding-left: 10px;
>h4 >span{
  color: gray;
  font-weight:300;
  margin-left: 4px;
  font-size: 10px;
  ;
}

`;
