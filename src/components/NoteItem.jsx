import React, { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import { AlertContext } from '../context/alerts/AlertContext';
import { SearchContext } from '../context/search/SearchContext';

const NoteItem = (props) => {
    const { note, showEditModal } = props;
    const { deleteNote } = useContext(NoteContext);
    const { showAlert } = useContext(AlertContext);
    const { searchValue } = useContext(SearchContext);
    console.log(note.tag.includes(searchValue), note.tag);
    return (
        (note.tag.includes(searchValue) || note.title.includes(searchValue) || note.description.includes(searchValue))
        &&
        <div className='col-md-3 my-3 '>
            <div className="card ">
                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'center'
                    }
                }>
                    <span className="badge rounded-pill bg-danger">
                        {note.tag}</span>
                </div>
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
