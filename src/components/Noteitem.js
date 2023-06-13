import React from 'react'
const Noteitem = (props) => {

  return (
    <>
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.note.title}</h5>
            <p className="card-text">{props.note.description}</p>
            <h5 className='mb-5'>{props.note.tag}</h5>
            <button type="button" className="btn btn-info me-5" onClick={()=> props.updateNote(props.note._id)}><i className='fa fa-edit'></i></button>
            <button type="button" className="btn btn-danger" onClick={()=> props.deleteHandleFunc(props.note._id)}><i className='fa fa-trash'></i></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Noteitem