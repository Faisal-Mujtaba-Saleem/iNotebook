import React, { useContext, useEffect, useRef, useState } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import NoteItem from './NoteItem'

const Notes = () => {
    const { notes, fetchNotes } = useContext(NoteContext);
    useEffect(() => {
        fetchNotes();
    }, [])

    const modal = useRef(null);

    const [editNote, setEditNote] = useState({ etitle: "", edescription: "", etag: "" });

    const showEditModal = (currentNote) => {
        modal.current.click();
        setEditNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const onChange = (e) => {
        setEditNote({ ...editNote, [e.target.name]: e.target.value });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Updating note... ", editNote);
    }

    return (
        <>
            <div className="container">
                {/* Button trigger modal  */}
                <button type="button" className="btn btn-primary d-none " ref={modal} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                {/* Modal  */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label" >Title </label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={editNote.etitle} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label" >Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={editNote.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label" >Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={editNote.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container my-3 '>
                <h2>Your Notes</h2>
                <div className="row">
                    {
                        notes.map((note, index) => {
                            return (
                                <NoteItem key={note._id} note={note} showEditModal={showEditModal} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Notes
