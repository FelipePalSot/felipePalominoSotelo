import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const USER_KEY = "limpiezaProUser";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return localStorage.getItem(USER_KEY) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, user);
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const login = (name) => setUser(name);
  const logout = () => setUser("");

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
