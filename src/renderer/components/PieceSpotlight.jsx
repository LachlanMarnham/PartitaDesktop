import React, { useEffect, useState } from 'react'
import Timer from './Timer'

function PieceSpotlight({ fetchPiece, emptyMessage, onNext }) {
  const [piece, setPiece] = useState(undefined)
  const [notes, setNotes] = useState('')

  const load = (loader) => {
    loader().then((result) => {
      setPiece(result)
      setNotes(result?.notes ?? '')
    })
  }

  useEffect(() => {
    load(fetchPiece)
  }, [fetchPiece])

  if (piece === undefined) {
    return <div className="view" />
  }

  if (!piece) {
    return (
      <div className="view">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  const handleNotesBlur = () => {
    window.api.updatePiece({
      id: piece.id,
      name: piece.name,
      composer: piece.composer,
      notes,
      learning: piece.learning
    })
  }

  return (
    <div className="view">
      <h2 className="piece-spotlight-name">{piece.name}</h2>
      <p className="piece-spotlight-composer">{piece.composer}</p>
      <textarea
        className="piece-spotlight-notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        onBlur={handleNotesBlur}
      />
      <div className="piece-spotlight-actions">
        {onNext && (
          <button className="piece-spotlight-next" onClick={() => load(onNext)}>
            Next
          </button>
        )}
        <Timer />
      </div>
    </div>
  )
}

export default PieceSpotlight
