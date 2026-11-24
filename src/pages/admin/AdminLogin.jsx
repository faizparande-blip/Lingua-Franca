import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Unified Admin Login Entry Point.
 * Seamlessly routes to the unified Lingua Franca authentication interface (/login)
 * while preserving the destination route (/admin) for authorized academy staff.
 */
export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate('/login', {
      replace: true,
      state: { 
        from: location.state?.from || { pathname: '/admin' },
        message: 'Please sign in with your administrator credentials.'
      },
    });
  }, [navigate, location]);

  return null;
}
