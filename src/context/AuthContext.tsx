import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, AdminUser, getAuthToken, setAuthToken, clearAuthToken, getAuthUser, setAuthUser } from '@/lib/api';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void> | void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => getAuthUser());
  const [token, setToken] = useState<string | null>(() => getAuthToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = getAuthToken();
      if (storedToken) {
        // If it's a demo session, immediately load user
        if (storedToken.startsWith('demo_')) {
          const cachedUser = getAuthUser();
          if (cachedUser) setUser(cachedUser);
          setIsLoading(false);
          return;
        }

        try {
          const profile = await api.auth.getMe();
          setUser(profile);
          setAuthUser(profile);
        } catch (err: any) {
          const msg = err?.message || '';
          // If offline / network error, keep cached user session
          if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('connection refused')) {
            const cachedUser = getAuthUser();
            if (cachedUser) setUser(cachedUser);
          } else if (msg.includes('401') || msg.includes('Could not validate credentials') || msg.includes('expired')) {
            console.log('Access token may be expired, attempting refresh using refresh token...');
            try {
              const refreshed = await api.auth.refresh();
              setUser(refreshed.admin);
              setToken(refreshed.access_token);
              setAuthUser(refreshed.admin);
            } catch (refreshErr) {
              console.warn('Session expired. Please sign in again:', refreshErr);
              clearAuthToken();
              setUser(null);
              setToken(null);
            }
          } else {
            // Non-auth error: retain cached session
            const cachedUser = getAuthUser();
            if (cachedUser) setUser(cachedUser);
          }
        }
      }
      setIsLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.auth.login(email, password);
      setUser(res.admin);
      setToken(res.access_token);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await api.auth.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
