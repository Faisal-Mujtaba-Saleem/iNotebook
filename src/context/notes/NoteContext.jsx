import { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteContextProvider = (props) => {
    const fetchedNotes = [
        {
            "_id": "655e3057754ae482e78443c5",
            "user": "65537f11ece68dc8121416ad",
            "title": "Simple Title",
            "description": "Simple Description",
            "tag": "Personal",
            "date": "2023-11-22T16:46:15.196Z",
            "__v": 0
        },
        {
            "_id": "655e308c754ae482e78443c7",
            "user": "65537f11ece68dc8121416ad",
            "title": "Complex Title",
            "description": "Complex Description",
            "tag": "Complex_Personal",
            "date": "2023-11-22T16:47:08.003Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(fetchedNotes)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
