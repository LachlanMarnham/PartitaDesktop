import React, { useEffect, useState } from 'react'
import AddPieceModal from '../components/AddPieceModal'

function PiecesView() {
  const [pieces, setPieces] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const refreshPieces = () => window.api.listPieces().then(setPieces)

  useEffect(() => {
    refreshPieces()
  }, [])

  return (
    <div className="view">
      <h2 className="view-title">Pieces</h2>
      <button type="button" className="add-button" onClick={() => setIsAddModalOpen(true)}>
        ADD
      </button>
      {isAddModalOpen && (
        <AddPieceModal
          onClose={() => setIsAddModalOpen(false)}
          onAdded={() => {
            refreshPieces()
            setIsAddModalOpen(false)
          }}
        />
      )}
      <table className="pieces-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Composer</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {pieces.map((piece) => (
            <tr key={piece.id}>
              <td>{piece.name}</td>
              <td>{piece.composer}</td>
              <td>{piece.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PiecesView
