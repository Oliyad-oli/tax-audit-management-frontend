import { useAuth } from '../context/AuthContext'
import NotificationCenter from './NotificationCenter'
import { useState, useEffect } from 'react'

function Navbar() {
  const { user, logout } = useAuth()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <nav className={`
      sticky top-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-white dark:bg-gray-900 shadow-md'
      }
    `}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Left Section - Logo and Brand */}
          <div className="flex items-center space-x-4">
            {/* Logo/Brand with gradient */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-white text-xl font-bold">A</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  AuditFlow
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tax Audit Management</p>
              </div>
            </div>

            {/* Quick Search - Hidden on mobile */}
            <div className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Quick search (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">🔍</span>
              <span className="absolute right-3 top-2 text-xs text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Section - Actions & User Menu */}
          <div className="flex items-center space-x-3 md:space-x-6">

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Sun Icon */}
                <span className={`absolute transition-all duration-300 transform ${
                  isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}>
                  ☀️
                </span>
                {/* Moon Icon */}
                <span className={`absolute transition-all duration-300 transform ${
                  isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`}>
                  🌙
                </span>
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isDarkMode ? 'Light mode' : 'Dark mode'}
              </span>
            </button>

            {/* Quick Actions */}
            <div className="hidden sm:flex items-center space-x-2">
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group">
                <span className="text-xl">📋</span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  New case
                </span>
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group">
                <span className="text-xl">📊</span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Reports
                </span>
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group">
                <span className="text-xl">⚡</span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Quick actions
                </span>
              </button>
            </div>

            {/* Notifications */}
            <NotificationCenter />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 group focus:outline-none"
              >
                {/* User Avatar with Status */}
                <div className="relative">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md transform group-hover:scale-105 transition-transform">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                </div>
                
                {/* User Info - Hidden on mobile */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {user?.name || 'Auditor'}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'Senior Auditor'}</span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">● Online</span>
                  </div>
                </div>
                
                {/* Dropdown Arrow */}
                <span className={`hidden md:block text-gray-500 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 z-50">
                  
                  {/* User Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                        {user?.name?.charAt(0) || 'A'}
                      </div>
                      <div className="text-white">
                        <p className="font-bold text-lg">{user?.name || 'Auditor'}</p>
                        <p className="text-sm text-blue-100">{user?.role || 'Senior Auditor'}</p>
                        <p className="text-xs text-blue-200 mt-1">{getGreeting()}, {user?.name?.split(' ')[0] || 'there'}!</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 dark:bg-gray-900">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-200">12</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Active cases</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-200">5</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-200">8</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    
                    <a href="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <span className="w-8 text-xl">👤</span>
                      <div className="flex-1">
                        <span className="font-medium">My Profile</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">View and edit your profile</p>
                      </div>
                    </a>

                    <a href="/settings" className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <span className="w-8 text-xl">⚙️</span>
                      <div className="flex-1">
                        <span className="font-medium">Settings</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Preferences and configuration</p>
                      </div>
                    </a>

                    <a href="/activity" className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <span className="w-8 text-xl">📈</span>
                      <div className="flex-1">
                        <span className="font-medium">Activity Log</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Your recent activities</p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">New</span>
                    </a>

                    <a href="/help" className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <span className="w-8 text-xl">❓</span>
                      <div className="flex-1">
                        <span className="font-medium">Help & Support</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Documentation and FAQs</p>
                      </div>
                    </a>

                    <hr className="my-2 border-gray-200 dark:border-gray-700" />

                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <span className="w-8 text-xl">🚪</span>
                      <div className="flex-1 text-left">
                        <span className="font-medium">Logout</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
                      </div>
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    <p>Version 2.0.1 • Last login: Today 09:45 AM</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search - Visible only on mobile */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">🔍</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar