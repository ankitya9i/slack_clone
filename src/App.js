import React from 'react';
import Temp from './temp';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login'; 
import styled from 'styled-components';
import {useCollection} from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Spinner from "react-spinkit";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Chats from './Components/Chats';
function App() {
  const [user,Loading]=useAuthState(auth);
  if(Loading){
    return (
      <AppLoading>
        <AppLoadingcontainer>
        <Spinner
        name="ball-spin-fade-loader" color='purple' fadeIn='none'/>
        </AppLoadingcontainer>
      </AppLoading>
    )
  }
  return (
    <div className='app'>
      <BrowserRouter>
      {!user?(<Login/>):
      <>
      <AppBody>
        <Sidebar user={user} />
        <Header />
      <Routes>
      <Route path="/" element={<Chats/>} />
      
      </Routes>
      </AppBody>
      </>
      }
     </BrowserRouter>
    
    </div>
  );
}

export default App;
const AppBody=styled.div`
display:flex;
height: 100vh;
`;
const AppLoading=styled.div`

`;
const AppLoadingcontainer=styled.div`

`;
