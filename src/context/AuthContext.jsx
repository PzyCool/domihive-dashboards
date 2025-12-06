// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('domihive_user');
        const storedToken = localStorage.getItem('domihive_auth_token');
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setAuthToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading auth:', error);
        // Clear invalid storage
        localStorage.removeItem('domihive_user');
        localStorage.removeItem('domihive_auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from API
      const mockUser = {
        id: 'user_001',
        name: 'Demo User',
        email: email,
        phone: '+2348012345678',
        interest: 'rent',
        createdAt: new Date().toISOString()
      };
      
      const token = 'mock_token_' + Date.now();
      
      // Save to localStorage
      localStorage.setItem('domihive_user', JSON.stringify(mockUser));
      localStorage.setItem('domihive_auth_token', token);
      
      setUser(mockUser);
      setAuthToken(token);
      
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = {
        id: 'user_' + Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        interest: userData.interest,
        createdAt: new Date().toISOString()
      };
      
      const token = 'mock_token_' + Date.now();
      
      // Save to localStorage
      localStorage.setItem('domihive_user', JSON.stringify(newUser));
      localStorage.setItem('domihive_auth_token', token);
      
      setUser(newUser);
      setAuthToken(token);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('domihive_user');
    localStorage.removeItem('domihive_auth_token');
    setUser(null);
    setAuthToken(null);
  };

  // Update user function
  const updateUser = (updatedData) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('domihive_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Check if user is authenticated
  const isAuthenticated = !!user && !!authToken;

  // Context value
  const value = {
    user,
    authToken,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;