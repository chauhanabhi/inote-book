
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)
    //Get all Notes
    const getNotes = async() =>{
      //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjdlYWMzNGU0NmE1YjUxYmVkNjgzIn0sImlhdCI6MTY4NDE3NjU1Nn0.fBbx0-O_qtjQ1tYUEmqSzwrVC9ngqwkpxXve2l4w1ek"
      },
    });
    const json = await response.json();
    //console.log(json);
    setNotes(json);
  }


    //Add a Note
    const addNote = async(title, description, tag) =>{
      //api call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjdlYWMzNGU0NmE1YjUxYmVkNjgzIn0sImlhdCI6MTY4NDE3NjU1Nn0.fBbx0-O_qtjQ1tYUEmqSzwrVC9ngqwkpxXve2l4w1ek"
        },
        body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
      });

///////////

        console.log("Adding a New Note");
       const note = {
        "_id": "6463c1f335734e7a30f15d07",
        "user": "64627eac34e46a5b51bed683",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-05-16T17:48:35.267Z",
        "__v": 0
      };
       setNotes(notes.concat(note))
    }
//Delete a Note
    const deleteNote = async(id)=>{
      //api Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjdlYWMzNGU0NmE1YjUxYmVkNjgzIn0sImlhdCI6MTY4NDE3NjU1Nn0.fBbx0-O_qtjQ1tYUEmqSzwrVC9ngqwkpxXve2l4w1ek"
        },
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);

      //console.log("Deleating the note with id" + id);
      const newNotes = notes.filter((note) => {return note._id === id});
      setNotes(newNotes)
}
 //Edit a note
    const editNote = async (id,title, description, tag)=>{
      //api call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjdlYWMzNGU0NmE1YjUxYmVkNjgzIn0sImlhdCI6MTY4NDE3NjU1Nn0.fBbx0-O_qtjQ1tYUEmqSzwrVC9ngqwkpxXve2l4w1ek"
        },
        body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects

      //logic to edit in client
      for(let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
        
      }

    }

    return(
       <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
       </noteContext.Provider>
    )

}

export default NoteState;