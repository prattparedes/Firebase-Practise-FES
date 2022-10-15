import React, { useEffect, useState } from 'react'
import "./App.css";
import { auth } from "./firebase/init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import Nav from './Component/Nav';


function App() {
  const [user, setUser] = React.useState('') 
  const [loading, setLoading] = React.useState(true)
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user);
      if (user) {
        setUser(user)
      } else {
        console.log('Not Logged In')
      }
    })
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "Carlos@hotmail.com", "kkcarlitos")
      .then(({ user }) => {
        console.log(user);
        setUser(user)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function login() {
    signInWithEmailAndPassword(auth, "thomas@hotmail.com", "pratt123")
    .then(({ user }) => {
      console.log(user)
      setUser(user)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function logout() {
    signOut(auth);
    setUser('')
  }

  return (
    <div className="App">
      <Nav register={register} login={login} logout={logout} user={user} loading={loading}/>
      {/* <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button> */}
      {loading ? 'Loading...' : 'El usuario actualmente es: ' + (user.email ? user.email : 'Nadie está logeado actualmente')}
    </div>
  );
}

export default App;
