import React, { useContext, useEffect, useRef, useState } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import NoteItem from './NoteItem'
import { AlertContext } from '../context/alerts/AlertContext';

const Notes = (props) => {
    const { notes, fetchNotes, editNote } = useContext(NoteContext);
    const { showAlert } = useContext(AlertContext);

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            props.setLogoutMessage(false);
            fetchNotes();
        } else {
            props.setLogoutMessage(true);
        }

    }, [])

    const modalRef = useRef(null);
    const closeRef = useRef(null);

    const [eNote, setENote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const showEditModal = (currentNote) => {
        modalRef.current.click();
        setENote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const onChange = (e) => {
        setENote({ ...eNote, [e.target.name]: e.target.value });
    }

    const handleUpdate = (e) => {
        editNote(eNote.id, eNote.etitle, eNote.edescription, eNote.etag);
        closeRef.current.click();
        showAlert('Successfully Updated Note', 'success')
    }

    return (
        <>
            <div className="container">
                {/* Button trigger modal  */}
                <button type="button" className="btn btn-primary d-none " ref={modalRef} data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={eNote.etitle} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label" >Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={eNote.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label" >Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={eNote.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" disabled={eNote.etitle.length < 3 || eNote.edescription.length < 10} onClick={handleUpdate}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container my-3 '>
                <h2>Your Notes</h2>
                <div className="container">
                    {
                        notes.length === 0 && 'No notes to display'
                    }
                </div>
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
