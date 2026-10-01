import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

const readSession = () => ({
  isAuthenticated: authService.isAuthenticated(),
  adminEmail: authService.getAdminEmail(),
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(readSession);

  useEffect(() => {
    const syncSession = () => setSession(readSession());
    window.addEventListener('storage', syncSession);
    return () => window.removeEventListener('storage', syncSession);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setSession({ isAuthenticated: true, adminEmail: data.email });
    return data;
  };

  const logout = () => {
    authService.logout();
    setSession({ isAuthenticated: false, adminEmail: null });
  };

  return (
    <AuthContext.Provider value={{ ...session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
