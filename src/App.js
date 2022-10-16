import React, { useEffect, useState } from 'react'
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import Nav from './Component/Nav';


function App() {
  const [user, setUser] = React.useState('') 
  const [loading, setLoading] = React.useState(true)

  function createPost() {
    const post = {
      title: "Consigue un trabajo de $400k dólares",
      description: "Finish Frontend Simplified",
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data()}));
    console.log(posts)
  }
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
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
      .then(({ user }) => {;
        setUser(user)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function login() {
    signInWithEmailAndPassword(auth, "thomas@hotmail.com", "pratt123")
    .then(({ user }) => {
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
      <br />
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
    </div>
  );
}

export default App;
