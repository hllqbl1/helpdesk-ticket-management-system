
import { Link } from 'react-router'

function Navbar() {
  return (
    <nav className="bg-blue-500 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-extrabold">
          Helpdesk
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="font-semibold hover:text-blue-200"
          >
            Home
          </Link>

          <Link
            to="/contact"
            className="font-semibold hover:text-blue-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
