import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertContextProvider = (props) => {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({ msg: message, type })
        setTimeout(() => {
            setAlert(null)
        }, 2000);
    }
    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}