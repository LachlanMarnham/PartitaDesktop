import { app } from 'electron'
import path from 'path'
import Database from 'better-sqlite3'
import migrations from './migrations'

const seedPieces = [
  { name: 'Prelude in C Major', composer: 'J.S. Bach', notes: 'BWV 846' },
  { name: 'Clair de Lune', composer: 'Claude Debussy', notes: 'Suite bergamasque, 3rd movement' },
  { name: 'Moonlight Sonata, 1st mvt', composer: 'Ludwig van Beethoven', notes: 'Op. 27 No. 2' }
]

const db = new Database(path.join(app.getPath('userData'), 'partita.db'))

function runMigrations() {
  const currentVersion = db.pragma('user_version', { simple: true })

  migrations
    .filter((migration) => migration.version > currentVersion)
    .sort((a, b) => a.version - b.version)
    .forEach((migration) => {
      db.transaction(() => {
        migration.up(db)
        db.pragma(`user_version = ${migration.version}`)
      })()
    })
}

runMigrations()

const { count } = db.prepare('SELECT COUNT(*) AS count FROM pieces').get()

if (count === 0) {
  const insert = db.prepare('INSERT INTO pieces (name, composer, notes) VALUES (@name, @composer, @notes)')
  const insertAll = db.transaction((pieces) => pieces.forEach((piece) => insert.run(piece)))
  insertAll(seedPieces)
}

export default db
