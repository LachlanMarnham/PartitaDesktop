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
  }
]

export default migrations
