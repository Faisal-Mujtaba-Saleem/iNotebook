import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../context/alerts/AlertContext';

const Signup = () => {
    const { showAlert } = useContext(AlertContext);

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const fetchAuthToken = async (name, email, password) => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({ name, email, password });

        let response = await fetch("http://localhost:5000/api/auth/createUser", {
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

    const { name, email, password } = credentials;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = await fetchAuthToken(name, email, password);
        console.log(authToken);
        if (authToken) {
            localStorage.setItem('auth-token', authToken);
            navigate('/');
            showAlert('Account Created Successfully', 'success');
        }
    }

    return (
        <div>
            <div className='container my-4'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={name} onChange={onChange} required minLength={3} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={email} onChange={onChange} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={password} onChange={onChange} required minLength={5} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
