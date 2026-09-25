import db from './db'
import { getLearningPieceId } from './pieces'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function getTodayFocusPieceId() {
  return db.prepare('SELECT piece_id FROM focus_log WHERE date = ?').get(today())?.piece_id
}

function getEligiblePieceIds() {
  const learningId = getLearningPieceId()
  const focusId = getTodayFocusPieceId()

  return db
    .prepare('SELECT id FROM pieces ORDER BY id')
    .all()
    .map((row) => row.id)
    .filter((id) => id !== learningId && id !== focusId)
}

function pickFromPool(eligibleIds) {
  if (eligibleIds.length === 0) return null

  const seenIds = new Set(db.prepare('SELECT piece_id FROM random_cycle_seen').all().map((row) => row.piece_id))

  let pool = eligibleIds.filter((id) => !seenIds.has(id))
  if (pool.length === 0) {
    db.prepare('DELETE FROM random_cycle_seen').run()
    pool = eligibleIds
  }

  return pool[Math.floor(Math.random() * pool.length)]
}

function persistPick(eligibleIds) {
  const pieceId = pickFromPool(eligibleIds)

  if (pieceId == null) {
    db.prepare('DELETE FROM random_state WHERE id = 1').run()
    return null
  }

  db.prepare(
    'INSERT INTO random_state (id, piece_id) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET piece_id = excluded.piece_id'
  ).run(pieceId)
  db.prepare('INSERT OR IGNORE INTO random_cycle_seen (piece_id) VALUES (?)').run(pieceId)

  return pieceId
}

const advanceCurrentPieceId = db.transaction(() => persistPick(getEligiblePieceIds()))

const resolveCurrentPieceId = db.transaction(() => {
  const state = db.prepare('SELECT piece_id FROM random_state WHERE id = 1').get()
  const eligibleIds = getEligiblePieceIds()

  if (state && eligibleIds.includes(state.piece_id)) return state.piece_id

  return persistPick(eligibleIds)
})

function getPieceRow(id) {
  if (id == null) return null

  return db.prepare('SELECT id, name, composer, notes, learning FROM pieces WHERE id = ?').get(id) ?? null
}

export function getRandomPiece() {
  return getPieceRow(resolveCurrentPieceId())
}

export function nextRandomPiece() {
  return getPieceRow(advanceCurrentPieceId())
}
