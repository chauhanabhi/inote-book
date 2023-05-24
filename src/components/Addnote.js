import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const Addnote = () => {
 const context = useContext(noteContext);
 const {addNote} = context;

const [note, setNote] = useState({titlt:"",description:"",tag:"default"});

 const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
 }
 
 const onChange = (e) =>{
    setNote({...note, [e.target.name] : e.target.value})
 }
  return (
    <>
    <div className="container">
     <h1>Add a Note</h1>
     <form>
  <div class="mb-3">
    <label htmlfor="title" class="form-label">Title</label>
    <input type="text" class="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
  </div>
  <div class="mb-3">
    <label htmlfor="description" class="form-label">Description</label>
    <input type="text" class="form-control" id="description" name="description" onChange={onChange}/>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={onChange} />
    <label class="form-check-label" htmlfor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
    </div>
    </>
  )
}

export default Addnote