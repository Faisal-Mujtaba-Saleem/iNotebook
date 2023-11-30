import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../context/alerts/AlertContext';

const Login = () => {
    const { showAlert } = useContext(AlertContext)
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const fetchAuthToken = async (email, password) => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({ email, password });

        let response = await fetch("http://localhost:5000/api/auth/loginUser", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let json = await response.json();
        if (json.success) {
            console.log(json);
            return json.authToken;
        } else {
            showAlert('Invalid Credentials', 'danger');
            console.log(json);
        }
    }

    const { email, password } = credentials;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = await fetchAuthToken(email, password);
        console.log(authToken);
        if (authToken) {
            localStorage.setItem('auth-token', authToken);
            showAlert('Loggedin Successfully', 'success');
            navigate('/');
        }
    }

    return (
        <div className='container my-4'>
            <div className="my-3">
                <h3>
                    Login to continue with iNotebook
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={email} onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={password} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
