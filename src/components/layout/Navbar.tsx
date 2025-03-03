import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">ResumeAI</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8 ml-10">
              <Link to="/templates" className="text-gray-700 hover:text-blue-600">Templates</Link>
              <Link to="/resume-builder" className="text-gray-700 hover:text-blue-600">Resume Builder</Link>
              <Link to="/cover-letter" className="text-gray-700 hover:text-blue-600">Cover Letter</Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 px-3 py-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link to="/templates" className="text-gray-700 hover:text-blue-600 px-3 py-2">Templates</Link>
              <Link to="/resume-builder" className="text-gray-700 hover:text-blue-600 px-3 py-2">Resume Builder</Link>
              <Link to="/cover-letter" className="text-gray-700 hover:text-blue-600 px-3 py-2">Cover Letter</Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2">Blog</Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;