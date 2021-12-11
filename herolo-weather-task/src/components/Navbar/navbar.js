import React from "react"
import { Link } from "react-router-dom"
import './navbar.css'

export default function Navbar(){
    return (
      <nav className="nav-ul">
        <h1>Herolo Weather Task</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </nav>
    )
  }