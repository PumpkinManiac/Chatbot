import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
  verifyEmailUser
} from '../helpers/api-communicator.js';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // { name, email } | null
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  /* Check cookies / session once on mount */
  useEffect(() => {
    (async () => {
      try {
        const data = await checkAuthStatus();  // your API returns { name, email } or null
        if (data) {
          setUser({ name: data.name, email: data.email });
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      }
    })();
  }, []);

  /* -------- Auth actions ----------------------------------------- */
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
    }
  };

  const signup = async (name, email, password) => {
    const data = await signupUser(name, email, password);
    if (data) {
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
    }
  };

  const verifyEmail = async (token) => {
    // Called after user clicks email link
    const data = await verifyEmailUser(token);
    if (data) {
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
      setEmailSent(false);
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoggedIn(false);
    window.location.reload(); // optional hard refresh
  };

  /* -------- Memoised context value ------------------------------- */
  const value = {
    user,          // null or { name, email }
    isLoggedIn, 
    emailSent,    // boolean
    login,         // (email, password) => Promise<void>
    signup, 
    verifyEmail,       // (name, email, password) => Promise<void>
    logout,        // () => Promise<void>
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* Optional: runtime prop checking */
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useAuth = () => useContext(AuthContext);
