import db from './db'

export function listPieces() {
  return db.prepare('SELECT id, name, composer, notes FROM pieces ORDER BY id').all()
}

export function addPiece(_event, { name, composer, notes }) {
  const { lastInsertRowid } = db
    .prepare('INSERT INTO pieces (name, composer, notes) VALUES (@name, @composer, @notes)')
    .run({ name, composer, notes })

  return db.prepare('SELECT id, name, composer, notes FROM pieces WHERE id = ?').get(lastInsertRowid)
}
