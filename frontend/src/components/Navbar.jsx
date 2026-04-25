// src/components/Navbar.jsx
import { Link } from "react-router"

function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between bg-[#0d1117] border-b border-teal-900/50">
      <h1 className="text-teal-300 font-semibold text-lg tracking-wide">ResumeAI</h1>
      <div className="flex gap-6">
        <Link to="/" className="text-teal-500 hover:text-teal-200 text-sm transition">Home</Link>
        <Link to="/signup" className="text-teal-500 hover:text-teal-200 text-sm transition">Signup</Link>
        <Link to="/login" className="text-teal-500 hover:text-teal-200 text-sm transition">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar