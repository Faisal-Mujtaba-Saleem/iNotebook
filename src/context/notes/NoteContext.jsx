import { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteContextProvider = (props) => {
    const fetchedNotes = [
        {
            "_id": "655e3057754ae482e7z8443c5",
            "user": "65537f11ece68dc8121416ad",
            "title": "Simple Title",
            "description": "Simple Description",
            "tag": "Personal",
            "date": "2023-11-22T16:46:15.196Z",
            "__v": 0
        },
        {
            "_id": "655e308c754ae482le787443c7",
            "user": "65537f11ece68dc8121416ad",
            "title": "Complex Title",
            "description": "Complex Description",
            "tag": "Complex_Personal",
            "date": "2023-11-22T16:47:08.003Z",
            "__v": 0
        },
        {
            "_id": "655e308c754ae485r2e78443c87",
            "user": "65537f11ece68dc8121416ad",
            "title": "Complex Title",
            "description": "Complex Description",
            "tag": "Complex_Personal",
            "date": "2023-11-22T16:47:08.003Z",
            "__v": 0
        },
        {
            "_id": "655e308c7544ae482e7844d3c07",
            "user": "65537f11ece68dc8121416ad",
            "title": "Complex Title",
            "description": "Complex Description",
            "tag": "Complex_Personal",
            "date": "2023-11-22T16:47:08.003Z",
            "__v": 0
        },
        {
            "_id": "655e308c754ae482e78484k3c97",
            "user": "65537f11ece68dc8121416ad",
            "title": "Complex Title",
            "description": "Complex Description",
            "tag": "Complex_Personal",
            "date": "2023-11-22T16:47:08.003Z",
            "__v": 0
        },
        {
            "_id": "655e308c754ae482e7894t43cy7",
            "user": "65537f11ece68dc8121416ad",
            "title": "Complex Title",
            "description": "Complex Description",
            "tag": "Complex_Personal",
            "date": "2023-11-22T16:47:08.003Z",
            "__v": 0
        },
        {
            "_id": "655e308c754ae482e78404m3ch7",
            "user": "65537f11ece68dc8121416ad",
            "title": "Complex Title",
            "description": "Complex Description",
            "tag": "Complex_Personal",
            "date": "2023-11-22T16:47:08.003Z",
            "__v": 0
        },
        {
            "_id": "655e308c75h4ae482e7v8443cs7",
            "user": "65537f11ece68dc8121416ad",
            "title": "Complex Title",
            "description": "Complex Description",
            "tag": "Complex_Personal",
            "date": "2023-11-22T16:47:08.003Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(fetchedNotes)

    // Add Note
    const AddNote = (title, description, tag) => {
        const note = {
            "_id": "655e308c75h4ae482e7v8443c7",
            "user": "65537f11ece68dc8121416ad",
            "title": title,
            "description": description,
            "tag": "Complex_Personal",
            "date": "2023-11-22T16:47:08.003Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    // Edit Note 
    const EditNote = (id) => {

    }

    // Delete Note
    const DeleteNote = (id) => {

    }

    return (
        <NoteContext.Provider value={{ notes, AddNote, EditNote, DeleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
