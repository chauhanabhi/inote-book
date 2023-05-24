
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "6463c1f335734e7a30f15d05",
          "user": "64627eac34e46a5b51bed683",
          "title": "My Name Abhishek",
          "description": "Creat New Note",
          "tag": "Personal",
          "date": "2023-05-16T17:48:35.092Z",
          "__v": 0
        },
        {
          "_id": "6463c1f335734e7a30f15d07",
          "user": "64627eac34e46a5b51bed683",
          "title": "My Name Amit",
          "description": "Creat New Note",
          "tag": "Personal",
          "date": "2023-05-16T17:48:35.267Z",
          "__v": 0
        }
        ,
        {
          "_id": "6463c1f335734e7a30f15d07",
          "user": "64627eac34e46a5b51bed683",
          "title": "My Name Abhilash",
          "description": "Creat New Note",
          "tag": "Personal",
          "date": "2023-05-16T17:48:35.267Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    //Add a Note
    const addNote = (title, description, tag) =>{
        // to do api call
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
    const deleteNote = (id)=>{
        const newNotes = notes.filter((note) => {return note._id == id});
        setNotes(newNotes)
    }
 //Edit a note
    const editNote = ()=>{

    }

    return(
       <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
        {props.children}
       </NoteContext.Provider>
    )

}

export default NoteState;