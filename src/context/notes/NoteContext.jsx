import { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteContextProvider = (props) => {
    const host = "http://localhost:5000/";

    const [notes, setNotes] = useState([]);

    // Fetch Notes 
    const fetchNotes = async () => {
        const headersList = {
            "Accept": "*/*",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzdmMTFlY2U2OGRjODEyMTQxNmFkIn0sImlhdCI6MTcwMDA1ODE1N30.iVZZEWyMQhey0PT4xJzWF-kcMFFO0JKUe8Nz_xQJw-c"
        }

        const response = await fetch(`${host}api/notes/getNotes`, {
            method: "GET",
            headers: headersList
        });

        const json = await response.json();
        // console.log(json);

        setNotes(json);
    }

    // Add Note
    const AddNote = async (title, description, tag) => {
<<<<<<< HEAD
        const headersList = {
=======
        let headersList = {
>>>>>>> 836978167cd01b8fe5261ea94b9832ae783541e0
            "Accept": "*/*",
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzdmMTFlY2U2OGRjODEyMTQxNmFkIn0sImlhdCI6MTcwMDA1ODE1N30.iVZZEWyMQhey0PT4xJzWF-kcMFFO0JKUe8Nz_xQJw-c"
        }

<<<<<<< HEAD
        const bodyContent = JSON.stringify({ title, description, tag });

        const response = await fetch(`${host}api/notes/addNote`, {
=======
        let bodyContent = JSON.stringify({ title, description, tag });

        let response = await fetch(`${host}api/notes/addNote`, {
>>>>>>> 836978167cd01b8fe5261ea94b9832ae783541e0
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

<<<<<<< HEAD
        const note = await response.json();
=======
        let note = await response.json();
>>>>>>> 836978167cd01b8fe5261ea94b9832ae783541e0
        // console.log(note);

        setNotes(notes.concat(note));
    }

    // Delete Note
    const DeleteNote = async (id) => {
        const headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzdmMTFlY2U2OGRjODEyMTQxNmFkIn0sImlhdCI6MTcwMDE1NTMzM30.YRHSzLzaGLKFHKnN1QC3x2BF9HSJL5SW5SF3XkC2aO4"
        }

        const response = await fetch(`${host}api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: headersList
        });

        const deletedNote = await response.json();
        console.log(deletedNote);

        const updatedNotes = notes.filter((note, index) => {
            return note._id !== id;
        })
        setNotes(updatedNotes);
    }

    // Edit Note 
    const EditNote = (id, title, description, tag) => {
        // TODO: API Call 
        console.log(`Editing note`);
    }

    return (
        <NoteContext.Provider value={{ notes, AddNote, EditNote, DeleteNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
