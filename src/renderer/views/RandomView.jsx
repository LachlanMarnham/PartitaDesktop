import React from 'react'
import PieceSpotlight from '../components/PieceSpotlight'

function RandomView() {
  return (
    <PieceSpotlight
      fetchPiece={window.api.getRandomPiece}
      onNext={window.api.nextRandomPiece}
      emptyMessage="Add a piece to get a random pick"
    />
  )
}

export default RandomView
