import React, { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import { AlertContext } from '../context/alerts/AlertContext';

const NoteItem = (props) => {
    const { note, showEditModal } = props;
    const { deleteNote } = useContext(NoteContext);
    const { showAlert } = useContext(AlertContext);
    return (
        <div className='col-md-3 my-3 '>
            <div className="card ">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between ">
                        <h5 className="card-title">{note.title}</h5>
                        <i id='delete' className="fa-solid fa-trash-can" onClick={() => {
                            deleteNote(note._id);
                            showAlert('Successfully Deleted Note', 'success')
                        }}></i>
                        <i id='edit' className="fa-solid fa-pen-to-square" onClick={(e) => { showEditModal(note); }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
