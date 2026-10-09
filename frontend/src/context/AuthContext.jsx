import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = apiService.getCurrentUser();
    if (saved) {
      setUser(saved);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await apiService.login(email, password);
    setUser(res);
    return res;
  };

  const register = async (name, email, phone, password) => {
    const res = await apiService.register(name, email, phone, password);
    setUser(res);
    return res;
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      login: async () => {},
      register: async () => {},
      logout: () => {},
      isAdmin: false,
      loading: false,
    };
  }
  return context;
};
