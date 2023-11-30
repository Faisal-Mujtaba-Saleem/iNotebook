import React, { useContext, useRef } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertContext } from '../context/alerts/AlertContext';
import { SearchContext } from '../context/search/SearchContext';

const Navbar = (props) => {
    const { showAlert } = useContext(AlertContext);
    const { setSearchValue } = useContext(SearchContext);

    const searchInputRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchInputRef.current.value);
        setSearchValue(searchInputRef.current.value);
    }

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/login');
        showAlert("You have been Loggedout from the iNotebook", "info");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{props.appName}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            {
                                (!localStorage.getItem('auth-token')) ?
                                    <>
                                        <Link type="button" className="btn btn-danger" to="/login">Login</Link>
                                        <Link type="button" className="btn btn-success" to="/signup">Signup</Link>
                                    </> :
                                    <>
                                        <form className="d-flex" onSubmit={handleSearch}>
                                            <input ref={searchInputRef} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-outline-success" type="submit">Search</button>
                                        </form>
                                        <button type="button" onClick={handleLogout} className="btn btn-success ms-2" >
                                            Logout
                                        </button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
