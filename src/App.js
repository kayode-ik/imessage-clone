import React , {useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import './App.css';
import { selectUser ,login, logout} from './features/userSlice';
import Imessage from './Imessage';
import Login from './Login';
import {auth } from "./firebase"


function App() {

  const user = useSelector(selectUser);
   const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        //User logged in
        dispatch(login({
          uid: authUser.uid,
          photo : authUser.photoURL,
          email: authUser.email,
          displayName : authUser.displayName,
        })
        );
      }else {
        //user logged out
        dispatch(logout())
      }
    })
    
  }, [])
  return (
    <div className="app">
      <header className="App-header">
      {user ? <Imessage /> :  <Login /> } 
      </header>
    </div>
  );
}

export default App;
