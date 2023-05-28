const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../modals/Notes');
const {body,validationResult} = require('express-validator');

//Route 1 : Get All the Notes Using: GET "/api/notes/fetchallnotes". Login required

router.get('/fetchallnotes', fetchuser, async(req,res) =>{
    try{const notes = await Notes.find({user: req.user.id});
    res.json(notes);
} catch (error){
    console.error(error.message);
    res.status(500).send("Some error occured");
}
});

//Route 2 : Add a new Note using: Post "/api/notes/addnote". Login required

router.post('/addnote',fetchuser,[
    body('title', "Enter a valid title").isLength({min: 3}),
    body('description', "Decription must be atleast 5 characters").isLength({min: 5}),
],async(req,res) =>{
    try{ 
     const {title, description,tag} = req.body;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const note = new Notes({
        title,description,tag,user:req.user.id
    })
    const savedNote = await note.save()

    res.json(savedNote)
}catch (error){
    console.error(error.message);
    res.status(500).send("Some error occured");
}
  
})


//Route 3 : Update an existing Note using : "Put /api/notes/addnote". Login required

router.put('/updatenote/:id', fetchuser, async (req,res) =>{
    try{ 
        const {title, description,tag} = req.body; 
        //Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        //Find the note to be updated and updated it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Note found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
        res.json(note)
    } catch(error) {
        console.error(error.message);
    res.status(500).send("Some error occured");
    }
});


//Route 4 : Delete an Note using : "Delete /api/notes/addnote". Login required

router.delete('/deletenote/:id', fetchuser, async (req,res) =>{
    try{ 
        //const {title, description,tag} = req.body; 
        
        //Find the note to be updated and updated it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Note found")}
        // Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleated",note: note})
    } catch(error) {
        console.error(error.message);
    res.status(500).send("Some error occured");
    }
});

module.exports = router