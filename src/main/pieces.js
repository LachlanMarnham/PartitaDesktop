import db from './db'

export function listPieces() {
  return db.prepare('SELECT id, name, composer, notes, learning FROM pieces ORDER BY id').all()
}

export function getLearningPieceId() {
  return db.prepare('SELECT id FROM pieces WHERE learning = 1').get()?.id
}

const insertPieceAsLearning = db.transaction((piece) => {
  const { lastInsertRowid } = db
    .prepare('INSERT INTO pieces (name, composer, notes, learning) VALUES (@name, @composer, @notes, 1)')
    .run(piece)

  db.prepare('UPDATE pieces SET learning = 0 WHERE id != ?').run(lastInsertRowid)

  return lastInsertRowid
})

export function addPiece(_event, { name, composer, notes }) {
  const id = insertPieceAsLearning({ name, composer, notes })

  return db.prepare('SELECT id, name, composer, notes, learning FROM pieces WHERE id = ?').get(id)
}

const updatePieceRow = db.transaction(({ id, name, composer, notes, learning }) => {
  db.prepare(
    'UPDATE pieces SET name = @name, composer = @composer, notes = @notes, learning = @learning WHERE id = @id'
  ).run({ id, name, composer, notes, learning })

  if (learning) {
    db.prepare('UPDATE pieces SET learning = 0 WHERE id != ?').run(id)
  }
})

export function updatePiece(_event, { id, name, composer, notes, learning }) {
  updatePieceRow({ id, name, composer, notes, learning: learning ? 1 : 0 })

  return db.prepare('SELECT id, name, composer, notes, learning FROM pieces WHERE id = ?').get(id)
}

export function deletePiece(_event, { id }) {
  db.prepare('DELETE FROM pieces WHERE id = ?').run(id)
}
