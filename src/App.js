import React, { useEffect, useState } from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "./Component/Nav";

function App() {
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodedId = "fQBEoVryGVCkQg6Il6yk";
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId)
    const newPost = {
      ...post,
      title: "Consigue un trabajo de $500k dólares"
    };
    console.log(newPost)
    updateDoc(postRef, newPost)
  }

  function deletePost() {
    const hardcodedId = "fQBEoVryGVCkQg6Il6yk";
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef)
  }

  function createPost() {
    const post = {
      title: "Termina de mejorar Linkedin",
      description: "Conecta con muchos devs",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      } else {
        console.log("Not Logged In");
      }
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "Carlos@hotmail.com", "kkcarlitos")
      .then(({ user }) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "carlos@hotmail.com", "kkcarlitos")
      .then(({ user }) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth);
    setUser("");
  }

  return (
    <div className="App">
      <Nav
        register={register}
        login={login}
        logout={logout}
        user={user}
        loading={loading}
      />
      {/* <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button> */}
      {loading
        ? "Loading..."
        : "El usuario actualmente es: " +
          (user.email ? user.email : "Nadie está logeado actualmente")}
      <br />
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
