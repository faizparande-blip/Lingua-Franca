import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signIn, 
  signOut, 
  getSession, 
  checkAdminStatus, 
  onAuthStateChange,
  resetPasswordForEmail,
  updateUserPassword
} from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function evaluateUser(currentUser) {
    if (!currentUser) {
      setUser(null);
      setIsAdmin(false);
      return false;
    }
    setUser(currentUser);
    const authorized = await checkAdminStatus(currentUser);
    setIsAdmin(authorized);
    return authorized;
  }

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      setIsLoading(true);
      try {
        const initialSession = await getSession();
        if (isMounted) {
          setSession(initialSession);
          await evaluateUser(initialSession?.user || null);
        }
      } catch (err) {
        console.error('[AuthContext] Session initialization error:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initAuth();

    // Listen to real-time auth changes
    const { data: authListener } = onAuthStateChange(async (_event, newSession) => {
      if (isMounted) {
        setSession(newSession);
        await evaluateUser(newSession?.user || null);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    const res = await signIn({ email, password });
    if (res.success) {
      setSession(res.session);
      const isAdm = await evaluateUser(res.user);
      setIsLoading(false);
      return { ...res, isAdmin: isAdm };
    }
    setIsLoading(false);
    return res;
  };

  const logout = async () => {
    setIsLoading(true);
    const res = await signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setIsLoading(false);
    return res;
  };

  const forgotPassword = async (email, redirectTo) => {
    return await resetPasswordForEmail(email, redirectTo);
  };

  const resetPassword = async (newPassword) => {
    return await updateUserPassword(newPassword);
  };

  const refreshAuth = async () => {
    const currentSession = await getSession();
    setSession(currentSession);
    await evaluateUser(currentSession?.user || null);
  };

  const value = {
    user,
    session,
    isAdmin,
    isLoading,
    login,
    logout,
    forgotPassword,
    resetPassword,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
