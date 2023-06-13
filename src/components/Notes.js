import React, { useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { fetchPost, deleteNote, editNote } from '../controller';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const {showAlert} = props;
  const [posts, setposts] = useState([]);
  const [changeDetect, setChangedetect] = useState(false);
  const [currentdata, setcurrentdata] = useState({title: "",description:"", tag:""});
  const ref = useRef(null)
  const history = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await fetchPost();
      if(localStorage.getItem("token")){
        setposts(data)
      }else{
        history("/")
      }
      setposts(data)
      setChangedetect(false);
    })()
  }, [changeDetect])


  /////Delete post
  const deletehandle = async (id) => {
    const result  = await deleteNote(id);
    if(result){
      const filtered = posts.filter(ele =>  ele._id !== id);
      setposts(filtered)
      props.showAlert("Dleated your post successfully", "success")  
    }
  }


///Change Handler
  const changeHadler = (e) => {   
    setcurrentdata({...currentdata, [e.target.name]: e.target.value});
  }

  const addedhandler =  () => {
    setChangedetect(true);
  }


  const updateNote = (id) => {
    ref.current.click();
    setcurrentdata(posts.filter(ele => ele._id === id)[0])
  }

  const updatePostsSave = async () => {
     const result = await editNote(currentdata, currentdata._id);
     ref.current.click();
    if(result === 200){
      props.showAlert("Update your post successfully", "success")    
     
      setChangedetect(true)  
    }
  }



  return (
    <div className="container">
      <Addnote showAlert={showAlert} newAdded={addedhandler}  />
       
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" value={currentdata.title} className="form-control" onChange={changeHadler}  name="title" minLength={5} required  aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" value={currentdata.description}  className="form-control" onChange={changeHadler} minLength={5} required  name="description" />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="exampleCheck1" >Tag</label>
                <input type="text" value={currentdata.tag}  className="form-control" onChange={changeHadler} minLength={5} required    name="tag" />
              </div>
        </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={currentdata.title.length<5||currentdata.description.length<5} type="button" className="btn btn-primary" onClick={updatePostsSave}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
     
      
      <div className="row g-5">
      <h1 className='mt-5'>Your Notes</h1>
      <div class="col-sm-12 mt-0">
       
       </div>
        {posts.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} deleteHandleFunc={deletehandle} />
        })}
      </div>
    </div>
  )
}

export default Notes
