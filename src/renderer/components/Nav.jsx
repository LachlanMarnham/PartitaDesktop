import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/pieces" className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}>
        Pieces
      </NavLink>
    </nav>
  )
}

export default Nav
