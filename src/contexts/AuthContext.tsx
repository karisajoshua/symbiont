
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check localStorage on initial load to restore authentication state
  useEffect(() => {
    const storedAuth = localStorage.getItem('symbiont_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Save authentication state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('symbiont_auth', isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
