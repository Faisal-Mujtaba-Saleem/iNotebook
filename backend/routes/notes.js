const Note = require('../models/Note');
const fetchUser = require('../middlewares/fetchUser');

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// ROUTE.1: Fetch all the notes using: GET "/api/notes/getNotes/", Login Required..
router.get(
    '/getNotes/',
    fetchUser,
    async (req, res) => {

        try {
            const user = req.user.id;
            const notes = await Note.find({ user });
            res.status(200).json(notes)
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
            console.error(error.message);
        }
    })

// ROUTE.2: Add a note using: POST "/api/notes/addNote/", Login Required..
router.post(
    '/addNote/',
    // A set of validation middlewares that cath the req_object and extracts the request's body before reaching to the req_handler callback and applies the validation methods on the specifed req_parameter, If the validation return false then the validator will throw an errors array into the request object with an error object. Each validator pushes an error object into the errors array only for the req_parameter specified init.
    [
        body('title', "title should be a string of atleast 3 character").isLength({ min: 3 }),
        body('description', "description should be of atleast 5 character").isLength({ min: 5 })
    ],
    fetchUser,
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions, if there are errors, return bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // .array method extracts the errors array wraped iside an errors object by validationResult().
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, tag } = req.body;

            // Creating an instance of a constructor function returned by the db document model note and takes an object based on the schema we had provided to our db document model note. The instance of the constructor function returned by the db document model note provides us the number of usefull props and methods on taking the object based on the schema to apply on this object from which the .save() method which we have used in this route saved this object into db as a document inside the collection it automatically creates on saving document based on the name of document model we had provided to our db document model note by simply pluralising it.
            const note = new Note({
                user: req.user.id,
                title, description, tag
            });
            const savedNote = await note.save();
            res.status(200).json(savedNote);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
            console.error(error.message);
        }
    })

// ROUTE.3: Updating an existing note using: PUT "/api/notes/updateNote/", Login Required..
router.put(
    '/updateNote/:id/',
    fetchUser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        try {
            // Creating a new note
            let newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            // Find if note to be upadated exists
            let note = await Note.findById(req.params.id);
            console.log(note);

            // If note does not exists the send response "Not found"
            if (!note) {
                return res.status(404).json({ error: "Not found" });
            }

            // Allow updation only if the user owns this note
            const user = req.user.id;
            if (user !== note.user.toString()) {
                return res.status(401).json({ error: "Not Allowed" });
            }


            // Find the note to be updated and update it
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.status(200).json(note);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
            console.error(error.message);
        }
    })

// ROUTE.4: Deleting an existing note using: DELETE "/api/notes/deleteNote/", Login Required..
router.delete(
    '/deleteNote/:id',
    fetchUser,
    async (req, res) => {
        try {
            // Find if note to be deleted exists
            let note = await Note.findById(req.params.id);
            console.log(note);

            // If note does not exists the send response "Not found"
            if (!note) {
                return res.status(404).json({ error: "Not found" });
            }

            // Allow deletion only if the user owns this note
            const user = req.user.id;
            if (user !== note.user.toString()) {
                return res.status(401).json({ error: "Not Allowed" });
            }

            // Find the note to be deleted and update it
            note = await Note.findByIdAndDelete(req.params.id);
            res.status(200).json({
                Success: "Note has been deleted successfully", note
            });
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
            console.error(error.message);
        }
    })

module.exports = router;