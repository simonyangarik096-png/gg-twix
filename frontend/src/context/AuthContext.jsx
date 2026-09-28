import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client.js';

// Context-ի ստեղծում
const AuthContext = createContext(null);

// Provider կոմպոնենտ — փաթաթում է ամբողջ app-ը
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // App-ի առաջին mount-ի ժամանակ → ստուգում ենք, արդյոք օգտատերը մուտք գործած է
  useEffect(() => {
    const token = localStorage.getItem('ggtwix_token');

    // Եթե token չկա → դադարեցնում ենք loading-ը
    if (!token) {
      setLoading(false);
      return;
    }

    // Եթե token կա → ստուգում ենք, վավեր է արդյոք
    api.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => {
        // Token-ը վավեր չէ → ջնջում ենք
        localStorage.removeItem('ggtwix_token');
      })
      .finally(() => setLoading(false));
  }, []);

  // Մուտք (Login)
  async function login(username, password) {
    const res = await api.post('/auth/login', { username, password });
    localStorage.setItem('ggtwix_token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }

  // Ելք (Logout)
  async function logout() {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // Անգամ եթե server-ը error տա, մենք միևնույն է դուրս ենք գալիս
    }
    localStorage.removeItem('ggtwix_token');
    setUser(null);
  }

  // Context-ի արժեքը
  const value = {
    user,        // Ընթացիկ օգտատեր (կամ null)
    loading,     // Բեռնվու՞մ է auth state-ը
    login,       // Login ֆունկցիա
    logout       // Logout ֆունկցիա
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — օգտագործելու համար context-ը
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth-ը պետք է օգտագործվի AuthProvider-ի ներսում');
  }

  return context;
}