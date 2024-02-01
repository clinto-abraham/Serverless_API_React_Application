import { useState, useEffect } from "react";
import "../styles/Note.css";
import CreateNote from "../components/Notes/CreateNote.jsx";
import Notes from "../components/Notes/Notes.jsx";
import { v4 as uuid } from "uuid";
import Header from "../components/Header/index.jsx";

function Home() {
  //states
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");

  // get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // add new note to the state array
  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: inputText
      }
    ]);
    //clear the textarea
    setInputText("");
  };

  //delete note function
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  //apply the save and get functions using useEffect
  //get the saved notes and add them to the array
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      setNotes(data);
    }
  }, []);

  //saving data to local storage
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <>
    <Header />
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

export default Home;


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