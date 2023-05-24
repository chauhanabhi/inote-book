import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes,addNote} = context;
  return (
    <div className="container">
    <Addnote />
    <h1>Your Notes</h1>
    <div className="row g-5">
    {notes.map((note)=>{
     return <Noteitem note={note} />
    })}
    </div>
   </div>
  )
}

export default Notes
