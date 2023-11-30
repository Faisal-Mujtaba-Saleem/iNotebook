import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddNote from './AddNote';
import Notes from './Notes';

const Home = () => {
    const [logoutMessage, setLogoutMessage] = useState(false);
    return (
        !logoutMessage ?
            <>
                <AddNote />
                <Notes setLogoutMessage={setLogoutMessage} />
            </> :
            <i>
                {`Please `}
                <Link to="/login">Login</Link>
                {` first if you have already an account or `}
                <Link to="/signup">Signup</Link>
                {` to continue with iNotebook!`}
            </i>
    )
}

export default Home
