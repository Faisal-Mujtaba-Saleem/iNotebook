import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = (props) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            {props.children}
        </SearchContext.Provider>
    )
}
