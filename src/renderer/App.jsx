import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import PiecesView from './views/PiecesView'
import LearningView from './views/LearningView'
import FocusView from './views/FocusView'
import RandomView from './views/RandomView'

function App() {
  return (
    <HashRouter>
      <div>
        <h1>Partita</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/pieces" replace />} />
          <Route path="/learning" element={<LearningView />} />
          <Route path="/focus" element={<FocusView />} />
          <Route path="/random" element={<RandomView />} />
          <Route path="/pieces" element={<PiecesView />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
