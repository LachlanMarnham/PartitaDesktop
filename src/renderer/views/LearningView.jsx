import React from 'react'
import PieceSpotlight from '../components/PieceSpotlight'

const fetchLearningPiece = () => window.api.listPieces().then((pieces) => pieces.find((p) => p.learning) ?? null)

function LearningView() {
  return <PieceSpotlight fetchPiece={fetchLearningPiece} emptyMessage="You're not learning any new pieces at the moment" />
}

export default LearningView
