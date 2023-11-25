import { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteContextProvider = (props) => {
    const host = "http://localhost:5000";

    const [notes, setNotes] = useState([]);

    // Fetch Notes 
    const fetchNotes = async () => {
        const headersList = {
            "Accept": "*/*",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzdmMTFlY2U2OGRjODEyMTQxNmFkIn0sImlhdCI6MTcwMDA1ODE1N30.iVZZEWyMQhey0PT4xJzWF-kcMFFO0JKUe8Nz_xQJw-c"
        }

        const response = await fetch(`${host}/api/notes/getNotes`, {
            method: "GET",
            headers: headersList
        });

        const json = await response.json();
        console.log(json);

        setNotes(json);
    }

    // Add Note
    const addNote = async (title, description, tag) => {
        const headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzdmMTFlY2U2OGRjODEyMTQxNmFkIn0sImlhdCI6MTcwMDA1ODE1N30.iVZZEWyMQhey0PT4xJzWF-kcMFFO0JKUe8Nz_xQJw-c"
        }

        const bodyContent = JSON.stringify({ title, description, tag });

        const response = await fetch(`${host}/api/notes/addNote`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        const note = await response.json();
        console.log(note);

        setNotes(notes.concat(note));
    }

    // Delete Note
    const deleteNote = async (id) => {
        const headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzdmMTFlY2U2OGRjODEyMTQxNmFkIn0sImlhdCI6MTcwMDE1NTMzM30.YRHSzLzaGLKFHKnN1QC3x2BF9HSJL5SW5SF3XkC2aO4"
        }

        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
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
    const editNote = async (id, title, description, tag) => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzdmMTFlY2U2OGRjODEyMTQxNmFkIn0sImlhdCI6MTcwMDA1ODE1N30.iVZZEWyMQhey0PT4xJzWF-kcMFFO0JKUe8Nz_xQJw-c"
        }

        let bodyContent = JSON.stringify({ title, description, tag });

        let response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });

        let json = await response.json();

        const updatedNotes = [...notes];
        for (let index = 0; index < notes.length; index++) {
            const note = notes[index];
            if (note._id === id) {
                console.log(updatedNotes[index]);
                updatedNotes[index] = json;
                break;
            }
        }
        setNotes(updatedNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
