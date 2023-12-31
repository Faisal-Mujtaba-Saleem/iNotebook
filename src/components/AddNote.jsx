import React, { useContext, useState } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import { AlertContext } from '../context/alerts/AlertContext';

const AddNote = () => {
    const { addNote } = useContext(NoteContext);
    const { showAlert } = useContext(AlertContext);

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        showAlert('Successfully Added Note', 'success')
    }

    return (
        <>
            <div className='container my-3 mt-5 '>
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title </label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>
                    <button type="button" disabled={note.title.length < 3 || note.description.length < 10} className="btn btn-primary" onClick={handleAddNote}>+ Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
