/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../styles/Note.css";
import CreateNote from "../components/Notes/CreateNote.jsx";
import Notes from "../components/Notes/Notes.jsx";
import { v4 as uuid } from "uuid";
import Header from "../components/Header/index.jsx";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import api from "../api";
import apiBearer from "../api/apiBearer.js";

const clinto = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbWVzQHlvcG1haWwuY29tIiwiaWF0IjoxNzA3MDUzOTMyLCJleHAiOjE3MDcwNTc1MzJ9.snJc9viZRMy7YrfHKfYsLj5oRy456afZB7PwOAE9lmA'
function Home({ signOut, user }) {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(()=> {
    const uniqueID = user?.userId
    const email = user?.signInDetails?.loginId
    api.get('/').then(res=> console.log(res,19)).catch(err=> console.log(err))
    apiBearer.put(`/sign-in`, { username : email }).then(res => {
      console.log(res?.token,21,'success for sign-in')
      localStorage.setItem('clinto', res?.token)
    }).catch(err=> console.log(err, 'err'))

    console.log(uniqueID,email,26)
  },[user])

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        listID: uuid(),
        description: inputText
      }
    ]);

    setInputText("");
    api.post(`/create-notes?token=${clinto}`, { description: inputText }).then(data => console.log(data.message)).catch(err => console.log(err))
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.listID !== id);
    setNotes(filteredNotes);
    apiBearer.patch(`/delete-notes-by-id?id=${id}&token=${clinto}`).then(data => console.log(data.message)).catch(err => console.log(err))
  };

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"))
    api.get(`/list-all-notes?token=${clinto}`).then(res => {
      if(res.data){
        setNotes(res.data.data)
      } else if (data) {
        setNotes(data);
      }
    }).catch(err => console.log(err))
  }, []);

  return (
    <>
    <Header signOut={signOut} />
    <div className="notes">
      {notes.map((note) => (
        <Notes
          key={note.listID + note.description}
          id={note.listID}
          text={note.description}
          deleteNote={() => deleteNote(note.listID)}
        />
      ))}
      <CreateNote
        textHandler={textHandler}
        saveHandler={saveHandler}
        inputText={inputText}
      />
    </div>
    </>
    
  );
}

const HomePage = withAuthenticator(Home)
export default HomePage;
