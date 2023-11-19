// A custom middleware takes an auth-token from the request header of the endpoints in which user login is required and  verifies it through jwt lib.'s verification method .verify() and then if the token is verified successfully then saves the user inside request object tooked from the jwt_data (payload) extracted from the auth-token through verfication method and then hand overs the request to the next request handler callback function by calling next(). 

const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(404).json({ error: "Access denied due to missing authToken" });
    }
    try {
        const jwt_data = jwt.verify(token, process.env.SECRET_KEY);
        req.user = jwt_data.user;
        next();
    } catch (err) {
        res.status(401).json({ error: "Access denied due to unauthorized token" });
        console.log(err.message);
    }
}

module.exports = fetchUser;