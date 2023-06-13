import React  from 'react'
import { useState } from 'react'
import { addNote } from '../controller';

const Addnote = (state) => {

  const [newPost, setNewPost] = useState({title: "",description:"", tag:""});

  const changeHadler = (e) => {   
    setNewPost({...newPost, [e.target.name]: e.target.value});
  }
  const addPosts = async (e) => {
    e.preventDefault();
    const result = await addNote(newPost);
   
    if(result === 200){
      setNewPost({title: "",description:"", tag:""});
      state.newAdded()
      alert('added');     
    }
  }

  return (
    <>
      <div className="container">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title"  onChange={changeHadler} minLength={5} required value={newPost.title}  aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description"  onChange={changeHadler} minLength={5} required value={newPost.description}  name="description" />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="exampleCheck1" >Tag</label>
            <input type="text" className="form-control" id="tag" onChange={changeHadler} minLength={5} required value={newPost.tag}  name="tag" />
          </div>
          <button type="submit" disabled={newPost.title.length<5|| newPost.description.length< 5} className="btn btn-primary" onClick={addPosts} >Submit</button>
        </form>
      </div>
    </>
  )
}

export default Addnote