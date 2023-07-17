import React from 'react'
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from '../firebase'
import { provider } from '../firebase';
function Login() {
    const Signin = (e) => {
     
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.error(errorMessage);
        });
         }
  return (
    <div>
    <Loginc>
    <LoginForm>
    <img src='https://yt3.ggpht.com/a/AATXAJy51qOIKXOR1PdcTQuIHdDR15QN8fVjXjS_gQ=s900-c-k-c0xffffffff-no-rj-mo'/>
    <h1>
        Sign in to projectease
    </h1>
    <Button type='Submit' onClick={Signin}>
        Sign in with google
    </Button>
    </LoginForm>
    </Loginc>
    </div>
  )
}




export default Login
const Loginc=styled.div` 
background-color: gray;
height: 100vh;
display: grid;
place-items: center;
`;
const LoginForm=styled.div` 
padding: 100px;
text-align:center;
background-color: #808080;
border: 1px solid black;
border-radius: 10px;
;
>img{
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
}
>button{
    margin-top: 50px;
    text-transform: inherit !important;
    background-color:#444;
    color:white;
}
`;
