import { listPieces, addPiece, updatePiece, deletePiece } from './pieces'
import { getFocusPiece } from './focus'
import { getRandomPiece, nextRandomPiece } from './random'

export default {
  'list-pieces': listPieces,
  'add-piece': addPiece,
  'update-piece': updatePiece,
  'delete-piece': deletePiece,
  'get-focus-piece': getFocusPiece,
  'get-random-piece': getRandomPiece,
  'next-random-piece': nextRandomPiece
}
