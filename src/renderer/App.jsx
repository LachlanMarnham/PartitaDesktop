import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import PiecesView from './views/PiecesView'

function App() {
  return (
    <HashRouter>
      <div>
        <h1>Partita</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/pieces" replace />} />
          <Route path="/pieces" element={<PiecesView />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
