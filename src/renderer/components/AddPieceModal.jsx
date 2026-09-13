import React, { useState } from 'react'
import Modal from './Modal'

function AddPieceModal({ onClose, onAdded }) {
  const [name, setName] = useState('')
  const [composer, setComposer] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await window.api.addPiece({ name, composer, notes })
    onAdded()
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="modal-title">Add Piece</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="piece-name">Name</label>
          <input id="piece-name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="piece-composer">Composer</label>
          <input
            id="piece-composer"
            type="text"
            value={composer}
            onChange={(event) => setComposer(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="piece-notes">Notes</label>
          <textarea id="piece-notes" rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-add">
            Add
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddPieceModal
