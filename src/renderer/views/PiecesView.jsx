import React, { useEffect, useState } from 'react'
import PieceFormModal from '../components/PieceFormModal'

function PiecesView() {
  const [pieces, setPieces] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingPiece, setEditingPiece] = useState(null)

  const refreshPieces = () => window.api.listPieces().then(setPieces)

  useEffect(() => {
    refreshPieces()
  }, [])

  return (
    <div className="view">
      <button type="button" className="add-button" onClick={() => setIsAddModalOpen(true)}>
        ADD
      </button>
      {isAddModalOpen && (
        <PieceFormModal
          title="Add Piece"
          submitLabel="Add"
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={async (values) => {
            await window.api.addPiece(values)
            refreshPieces()
            setIsAddModalOpen(false)
          }}
        />
      )}
      {editingPiece && (
        <PieceFormModal
          title="Update Piece"
          submitLabel="Update"
          initialValues={editingPiece}
          onClose={() => setEditingPiece(null)}
          onSubmit={async (values) => {
            await window.api.updatePiece({ id: editingPiece.id, ...values })
            refreshPieces()
            setEditingPiece(null)
          }}
          onDelete={async () => {
            await window.api.deletePiece({ id: editingPiece.id })
            refreshPieces()
            setEditingPiece(null)
          }}
        />
      )}
      <table className="pieces-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Composer</th>
            <th>Notes</th>
            <th>Learning</th>
          </tr>
        </thead>
        <tbody>
          {pieces.map((piece) => (
            <tr key={piece.id} onClick={() => setEditingPiece(piece)}>
              <td>{piece.name}</td>
              <td>{piece.composer}</td>
              <td>{piece.notes}</td>
              <td>
                <input type="checkbox" checked={!!piece.learning} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PiecesView
