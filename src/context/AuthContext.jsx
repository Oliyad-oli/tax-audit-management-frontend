import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // For now, always return a mock authenticated user
  const [user] = useState({
    id: 1,
    name: 'John Auditor',
    role: 'Senior Auditor',
    permissions: ['view_cases', 'create_cases', 'edit_cases', 'delete_cases', 'view_plans', 'conduct_audit', 'quality_review', 'view_reports']
  })

  const login = async () => {
    return { success: true }
  }

  const logout = () => {
    console.log('Logout clicked')
  }

  const hasPermission = () => {
    return true // Always return true for now
  }

  const value = {
    user,
    loading: false,
    login,
    logout,
    hasPermission,
    isAuthenticated: true // Always authenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}