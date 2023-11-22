import { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteContextProvider = (props) => {
    const [state, setState] = useState({
        name: "Faisal",
        class: "5b"
    })
    const updateState = (ms) => {
        setTimeout(() => {
            setState({
                name: `Harry's Student`,
                class: "10b"
            })
        }, ms);
    }

    return (
        <NoteContext.Provider value={{ state, updateState }}>
            {props.children}
        </NoteContext.Provider>
    )
}
