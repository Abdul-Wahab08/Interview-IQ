import { Link } from "react-router"
import { useSelector } from "react-redux"
import LogoutBtn from "./LogoutBtn"

function Navbar() {
  const authStatus = useSelector((state) => state.auth.isAuthenticated)

  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between bg-[#0d1117] border-b border-teal-900/50">
      <h1 className="text-teal-300 font-semibold text-lg tracking-wide">InterviewIQ</h1>
      <div className="flex gap-6">
        <Link to="/" className="text-teal-500 hover:text-teal-200 text-sm transition">Home</Link>
        {!authStatus ?
            <Link to="/login" className="text-teal-500 hover:text-teal-200 text-sm transition">Login</Link>
          :
          <LogoutBtn />
        }
      </div>
    </nav>
  )
}

export default Navbar