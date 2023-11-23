import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3 my-3 '>
            <div className="card ">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between ">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can"></i>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
