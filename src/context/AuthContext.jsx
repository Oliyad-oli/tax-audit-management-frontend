import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock user database (in real app, this would be in backend)
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@odflow.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatar: '👨‍💼'
  },
  {
    id: 2,
    email: 'auditor@odflow.com',
    password: 'auditor123',
    firstName: 'John',
    lastName: 'Auditor',
    role: 'auditor',
    avatar: '👨‍💻'
  },
  {
    id: 3,
    email: 'manager@odflow.com',
    password: 'manager123',
    firstName: 'Sarah',
    lastName: 'Manager',
    role: 'manager',
    avatar: '👩‍💼'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('odflow_user');
    const storedToken = localStorage.getItem('odflow_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user in mock database
    const foundUser = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Generate mock token
      const token = `odflow_token_${Date.now()}_${foundUser.id}`;
      
      // Store in localStorage
      localStorage.setItem('odflow_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('odflow_token', token);
      
      setUser(userWithoutPassword);
      setLoading(false);
      return { success: true, user: userWithoutPassword };
    } else {
      setLoading(false);
      setError('Invalid email or password');
      return { success: false, error: 'Invalid email or password' };
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = MOCK_USERS.find(
      u => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
      setLoading(false);
      setError('User with this email already exists');
      return { success: false, error: 'User already exists' };
    }

    // Create new user (in real app, this would be in backend)
    const newUser = {
      id: MOCK_USERS.length + 1,
      ...userData,
      role: 'auditor',
      avatar: '👤'
    };

    // In a real app, you would add to database
    // For demo, we'll just return success
    
    setLoading(false);
    return { success: true, user: newUser };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('odflow_user');
    localStorage.removeItem('odflow_token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};