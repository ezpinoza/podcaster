import React from 'react'
import { Link } from 'react-router-dom'

export function NavBar() {
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Podcaster</h1>
      </Link>
    </div>
  )
}
