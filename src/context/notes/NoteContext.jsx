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
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzdmMTFlY2U2OGRjODEyMTQxNmFkIn0sImlhdCI6MTcwMDA1ODE1N30.iVZZEWyMQhey0PT4xJzWF-kcMFFO0JKUe8Nz_xQJw-c"
        }

        let bodyContent = JSON.stringify({ title, description, tag });

        let response = await fetch(`${host}api/notes/addNote`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let note = await response.json();
        // console.log(note);

        setNotes(notes.concat(note));
    }

    // Delete Note
    const DeleteNote = (id) => {
        // TODO: API Call 
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
