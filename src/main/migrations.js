const migrations = [
  {
    version: 1,
    up: (db) => {
      db.exec(`
        CREATE TABLE pieces (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          composer TEXT NOT NULL,
          notes TEXT
        )
      `)
    }
  },
  {
    version: 2,
    up: (db) => {
      db.exec('ALTER TABLE pieces ADD COLUMN learning INTEGER NOT NULL DEFAULT 1')

      const firstPiece = db.prepare('SELECT id FROM pieces ORDER BY id LIMIT 1').get()
      if (firstPiece) {
        db.prepare('UPDATE pieces SET learning = 0 WHERE id = ?').run(firstPiece.id)
      }
    }
  },
  {
    version: 3,
    up: (db) => {
      db.exec(`
        CREATE TABLE focus_log (
          date TEXT PRIMARY KEY,
          piece_id INTEGER NOT NULL
        )
      `)
    }
  },
  {
    version: 4,
    up: (db) => {
      db.exec(`
        CREATE TABLE focus_cycle_seen (
          piece_id INTEGER PRIMARY KEY
        )
      `)
      db.exec('INSERT INTO focus_cycle_seen (piece_id) SELECT DISTINCT piece_id FROM focus_log')
    }
  },
  {
    version: 5,
    up: (db) => {
      db.exec(`
        CREATE TABLE random_cycle_seen (
          piece_id INTEGER PRIMARY KEY
        )
      `)
      db.exec(`
        CREATE TABLE random_state (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          piece_id INTEGER NOT NULL
        )
      `)
    }
  }
]

export default migrations
