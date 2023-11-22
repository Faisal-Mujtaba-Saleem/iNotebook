import { React, useContext, useEffect } from 'react';
import { NoteContext } from '../context/notes/NoteContext';

const About = () => {
    const noteContext = useContext(NoteContext);
    useEffect(() => {
        noteContext.updateState(1000);

    }, [])

    return (
        <div>
            This is About {noteContext.name} and he is in class {noteContext.state.class}
        </div>
    )
}

export default About
