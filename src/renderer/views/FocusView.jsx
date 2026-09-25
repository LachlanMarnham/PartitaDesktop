import React from 'react'
import PieceSpotlight from '../components/PieceSpotlight'

function FocusView() {
  return <PieceSpotlight fetchPiece={window.api.getFocusPiece} emptyMessage="Add a piece to get a daily focus pick" />
}

export default FocusView
