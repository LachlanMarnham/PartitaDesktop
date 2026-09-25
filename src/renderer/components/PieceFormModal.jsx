import React, { useState } from 'react'
import Modal from './Modal'

function PieceFormModal({ title, submitLabel, initialValues, onSubmit, onClose, onDelete }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [composer, setComposer] = useState(initialValues?.composer ?? '')
  const [notes, setNotes] = useState(initialValues?.notes ?? '')
  const [learning, setLearning] = useState(!!initialValues?.learning)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const values = { name, composer, notes }
    if (initialValues) {
      values.learning = learning
    }
    await onSubmit(values)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      onDelete()
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        {onDelete && (
          <button type="button" className="btn-delete-icon" onClick={handleDelete} aria-label="Delete piece">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.8 12.2a1 1 0 0 1-1 .8H8.8a1 1 0 0 1-1-.8L7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <h2 className="modal-title">{title}</h2>
      </div>
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
        {initialValues && (
          <div className="form-field-checkbox">
            <input
              id="piece-learning"
              type="checkbox"
              checked={learning}
              onChange={(event) => setLearning(event.target.checked)}
            />
            <label htmlFor="piece-learning">Learning</label>
          </div>
        )}
        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-confirm">
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default PieceFormModal
