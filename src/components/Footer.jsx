import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>&copy; 2025 My App. All rights reserved.</p>
      <nav>
        <ul className="flex justify-center space-x-4 mt-2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
     </footer>
  )
}
