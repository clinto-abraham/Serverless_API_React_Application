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

function Home({ signOut, user }) {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  
  useEffect(()=> {
    const uniqueID = user?.userId
    const email = user?.signInDetails?.loginId
    api.get('/').then(res=> console.log(res,19)).catch(err=> console.log(err))
    api.put('/sign-in', { username : email }).then(res => {
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
        id: uuid(),
        text: inputText
      }
    ]);

    setInputText("");
    apiBearer.post('/create-notes', { description: inputText }).then(data => console.log(data.message)).catch(err => console.log(err))
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    apiBearer.patch(`/delete-notes-by-id?id=${id}`).then(data => console.log(data.message)).catch(err => console.log(err))
  };

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"))
    apiBearer.get(`/list-all-notes`).then(res => {
      if(res.data){
        setNotes(res.data)
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
          key={note.id}
          id={note.id}
          text={note.text}
          deleteNote={deleteNote}
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


// import { useTransition } from 'react';
// import { useNavigate } from 'react-router-dom'
// // import { cognitoURL } from '../utils/awsExports';

// const Home = () => {
//     const Navigate = useNavigate();
//     const [pending, startTransition] = useTransition();
    
//     console.log(pending)
//     return (
//         <>
//             <div className='home'>
//                 <h1>Welcome to TOC </h1>
//                 <h6>Top Of Cliff Developer</h6>
//                 <div className='homeButtons'>
//                     <a href='https://serverless-dockets-manager.auth.ap-south-1.amazoncognito.com/login?client_id=bp9sla9jgtnlfd34qgpauv6rc&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F'>
//                         Sign In
//                     </a>
//                     <button style={{ margin: '10px' }} onClick={() => startTransition(() => Navigate('/login'))}>
//                         Login
//                     </button>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Home