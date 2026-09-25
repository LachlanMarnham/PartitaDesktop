import db from './db'
import { getLearningPieceId } from './pieces'

function today() {
  return new Date().toISOString().slice(0, 10)
}

const chooseTodayPieceId = db.transaction((date) => {
  const existing = db.prepare('SELECT piece_id FROM focus_log WHERE date = ?').get(date)
  if (existing) return existing.piece_id

  const learningId = getLearningPieceId()
  const pieceIds = db
    .prepare('SELECT id FROM pieces ORDER BY id')
    .all()
    .map((row) => row.id)
    .filter((id) => id !== learningId)

  if (pieceIds.length === 0) return null

  const seenIds = new Set(db.prepare('SELECT piece_id FROM focus_cycle_seen').all().map((row) => row.piece_id))

  let pool = pieceIds.filter((id) => !seenIds.has(id))
  if (pool.length === 0) {
    db.prepare('DELETE FROM focus_cycle_seen').run()
    pool = pieceIds
  }

  const pieceId = pool[Math.floor(Math.random() * pool.length)]

  db.prepare('INSERT INTO focus_log (date, piece_id) VALUES (?, ?)').run(date, pieceId)
  db.prepare('INSERT OR IGNORE INTO focus_cycle_seen (piece_id) VALUES (?)').run(pieceId)

  return pieceId
})

export function getFocusPiece() {
  const pieceId = chooseTodayPieceId(today())
  if (pieceId == null) return null

  return db.prepare('SELECT id, name, composer, notes, learning FROM pieces WHERE id = ?').get(pieceId) ?? null
}
