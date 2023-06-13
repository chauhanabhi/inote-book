const host = "http://localhost:5000";


//Fetch all a Note
export const fetchPost = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
    });   
    return await response.json();
}


//Add a Note
export const addNote = async (data) => {
    //api call
    let res =  await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data),
    })

    return await res.status;
}

//Edit a Note
export const editNote = async (data, id)=>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(data), 
    });
    return await response.status; 
  }

//Delete a Note
export const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
    });
    console.log(response)
    return await response.json();
}