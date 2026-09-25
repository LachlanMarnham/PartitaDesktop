import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/learning" className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}>
        Learning
      </NavLink>
      <NavLink to="/focus" className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}>
        Focus
      </NavLink>
      <NavLink to="/random" className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}>
        Random
      </NavLink>
      <NavLink to="/pieces" className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}>
        Pieces
      </NavLink>
    </nav>
  )
}

export default Nav
