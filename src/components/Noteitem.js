import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
const context = useContext(noteContext);
const {deleteNote} = context;
const {note} = props;
return (
<>
<div className="col-sm-4">
<div className="card">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <h5 className='mb-5'>{note.tag}</h5>
    <button type="button" className="btn btn-info me-5"><i className='fa fa-edit'></i></button>
    <button type="button" className="btn btn-danger"><i className='fa fa-trash' onClick={()=>{deleteNote(note._id)}}></i></button>
  </div>
  </div>
</div>
    </>
    
  )
}

export default Noteitem