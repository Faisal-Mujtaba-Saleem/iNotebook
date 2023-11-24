import React, { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { note } = props;
    const { DeleteNote, EditNote } = useContext(NoteContext);
    return (
        <div className='col-md-3 my-3 '>
            <div className="card ">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between ">
                        <h5 className="card-title">{note.title}</h5>
                        <i id='delete' className="fa-solid fa-trash-can" onClick={() => { DeleteNote(note._id) }}></i>
                        <i id='edit' className="fa-solid fa-pen-to-square" onClick={EditNote}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
