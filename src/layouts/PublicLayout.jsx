import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function PublicLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">OD</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  ODFlow
                </span>
                <p className="text-xs text-gray-500">Tax Audit Management</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About Us</Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium transition">Services</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2 border-l pl-4 border-gray-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user?.firstName?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm text-gray-700">{user?.firstName} {user?.lastName}</span>
                    <button
                      onClick={logout}
                      className="text-red-600 hover:text-red-800 text-sm font-medium ml-2"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <div className="flex items-center justify-between border-t pt-3 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                        {user?.firstName?.charAt(0) || 'U'}
                      </div>
                      <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Restored Footer - Exactly as before with login integration */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">OD</span>
                </div>
                <span className="text-xl font-bold">ODFlow</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Revolutionizing tax audit management with cutting-edge technology and professional expertise.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">📘</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">📱</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">💼</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">📧</a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white transition">Services</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
                {!isAuthenticated ? (
                  <li><Link to="/login" className="text-blue-400 hover:text-blue-300 transition">Login</Link></li>
                ) : (
                  <li><Link to="/dashboard" className="text-blue-400 hover:text-blue-300 transition">Dashboard</Link></li>
                )}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2">
                <li><Link to="/services#desk-audit" className="text-gray-400 hover:text-white transition">Desk Audit</Link></li>
                <li><Link to="/services#comprehensive" className="text-gray-400 hover:text-white transition">Comprehensive Audit</Link></li>
                <li><Link to="/services#transfer-pricing" className="text-gray-400 hover:text-white transition">Transfer Pricing</Link></li>
                <li><Link to="/services#joint-audit" className="text-gray-400 hover:text-white transition">Joint Audit</Link></li>
                <li><Link to="/services#fraud" className="text-gray-400 hover:text-white transition">Fraud Investigation</Link></li>
                <li><Link to="/services#risk" className="text-gray-400 hover:text-white transition">Risk Assessment</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-gray-400">
                  <span className="text-xl">📍</span>
                  <span>Bole Road, Addis Ababa, Ethiopia</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <span className="text-xl">📞</span>
                  <span>+251 911 234 567</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <span className="text-xl">📧</span>
                  <span>info@odflow.com</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <span className="text-xl">🕒</span>
                  <span>Mon-Fri: 8:00 - 17:00</span>
                </li>
              </ul>
              
              {/* Newsletter Signup */}
              <div className="mt-6">
                <h5 className="text-sm font-semibold mb-2">Stay Updated</h5>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex-1"
                  />
                  <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition text-sm font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar with Copyright */}
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2024 ODFlow. All rights reserved. Designed and developed by{' '}
                <a href="https://github.com/oliaddandena" className="text-blue-400 hover:text-blue-300 transition font-medium">
                  Oliad Dandena
                </a>
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</Link>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</Link>
                <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition">Sitemap</Link>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>Empowering tax authorities with modern audit solutions. Trusted by leading organizations across Ethiopia.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;