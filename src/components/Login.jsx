import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
            console.log(json);
            alert("Invalid credentials");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = await fetchAuthToken(credentials.email, credentials.password);
        console.log(authToken);
        if (authToken) {
            localStorage.setItem('auth-token', authToken);
            navigate('/');
        }
    }

    return (
        <div className='container my-4'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
