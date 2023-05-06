import { Timestamp } from 'firebase/firestore';
import React from 'react'
import styled from 'styled-components'
function Msg({msg1,img1,user}) {
  return (
    <Msgcointainer>
      <img src={img1} alt='userimg'/>
      <MessageInfo>
      <h4>
        {user}
        <span>
       
        </span>
      </h4>
      <p>
        {msg1}
      </p>
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
