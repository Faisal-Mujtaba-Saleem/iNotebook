const User = require('../models/User');
const fetchUser = require('../middlewares/fetchUser')

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ROUTE.1: Create a user using: POST "/api/auth/createUser/", No Login Required.
router.post(
    '/createUser/',
    // A set of validation middlewares that cath the req_object and extracts the request's body before reaching to the req_handler callback and applies the validation methods on the specifed req_parameter, If the validation return false then the validator will throw an errors array into the request object with an error object. Each validator pushes an error object into the errors array only for the req_parameter specified init.
    [
        body('name', "name should be a string of atleast 3 character").isLength({ min: 3 }),
        body('email', "Invalid email value").isEmail(),
        body('password', "password should be of atleast 5 character").isLength({ min: 5 })
    ],

    async (req, res) => {
        let success = false;

        // Finds the validation errors in this request and wraps them in an object with handy functions, if there are errors, return bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // .array method extracts the errors array wraped iside an errors object by validationResult().
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            const { name, email, password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            // Creates a user document and insert it into db. If the insertion success then it will resolve a promise wih the resolution value = inserted document.
            let user = await User.create({
                name, email, password: hash,
            })
            // Payload data
            const jwt_data = {
                user: {
                    id: user._id
                }
            }
            // It take payload as first arg. and the secret key as 2nd arg. for verification and a default header if not provided as a 3rd arg. contaning the signing algorithm being used and the token type then create a token with unique signature for every user/2nd party based on the payload, header if provided else default and a secret key the signature can't be complete if any one of them is missing we only share payload and the header with the user/2nd party and keep the secret key save to us.
            const authToken = jwt.sign(jwt_data, process.env.SECRET_KEY);
            console.log(authToken);

            success = true;
            res.status(200).json({ success, authToken });
        } catch (error) {
            // Checking that if the err is related to the duplicate email.
            if (error.code === 11000) {
                res.status(400).json({ success, error: 'Sorry a user with this email already exists' });
                console.error(error.message);
            } else {
                res.status(500).send({ success, error: "Internal Server Error" });
                console.error(error.message);
            }

        }
    }
)

// // ROUTE.2: Authenticate a user using: POST "/api/auth/loginUser/", No Login Required.
router.post(
    '/loginUser/',
    // A set of validation middlewares that cath the req_object and extracts the request's body before reaching to the req_handler callback and applies the validation methods on the specifed req_parameter, If the validation return false then the validator will throw an errors array into the request object with an error object. Each validator pushes an error object into the errors array only for the req_parameter specified init.
    [
        body('email', "Invalid email value").isEmail(),
        body('password', "password could not be blank").exists()
    ],
    async (req, res) => {
        let success = false;

        // Finds the validation errors in this request and wraps them in an object with handy functions, if there are errors, return bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // .array method extracts the errors array wraped iside an errors object by validationResult().
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            // Extracting the email and the password from the request body.
            const { email, password } = req.body;
            console.log(req.body);

            // Finding that if the user with this email exists in our db.
            const user = await User.findOne({ email });
            console.log(email);

            // Sending the status code 400 for the bad request with custom error in response if the user do not exists with the loggedin email
            if (!user) {
                return res.status(400).json({ success, error: "Try to login using correct credentials" });
            }

            /* Comparing loggedin password with the password hash stored in our db.
             The .compare() method first extracts the salt of the hash provided to it and combines it with the loggedin password and creates its hash then compares the both hashes if comparison successes then it returns true else false */
            const comparePassword = await bcrypt.compare(password, user.password);
            console.log(comparePassword);

            // Sending the status code 400 for the bad request with custom error in response if the password comparison fails.
            if (!comparePassword) {
                return res.status(400).json({ success, error: "Try to login using correct credentials" });
            }

            // Payload data
            const jwt_data = {
                user: {
                    id: user._id
                }
            }
            // It take payload as first arg. and the secret key as 2nd arg. for verification and a default header if not provided as a 3rd arg. contaning the signing algorithm being used and the token type then create a token with unique signature for every user/2nd party based on the payload, header if provided else default and a secret key the signature can't be complete if any one of them is missing we only share payload and the header with the user/2nd party and keep the secret key save to us.
            const authToken = jwt.sign(jwt_data, process.env.SECRET_KEY);
            console.log(authToken);
            success = true;
            res.status(200).json({ success, authToken });
        } catch (error) {
            success = false;
            res.status(500).send({ success, error: "Internal Server Error" });
            console.error(error.message);
        }

    })

// ROUTE.3: Get loggedin user details using: GET "/api/auth/getUser/", Login Required..
router.get(
    '/getUser/',
    fetchUser,
    async (req, res) => {
        let success = false;
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('-password');
            success = true;
            res.status(200).json({ success, user })
        } catch (error) {
            res.status(500).send({ success, error: "Internal Server Error" });
            console.error(error.message);
        }
    })

module.exports = router;