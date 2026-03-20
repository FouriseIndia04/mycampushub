import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsed = JSON.parse(storedUser);

        // 🔥 ensure _id exists
        if (parsed && parsed._id) {
          setUser(parsed);
        } else {
          localStorage.removeItem("user");
        }

      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ✅ LOGIN
  const login = (data) => {
    if (!data || !data._id) {
      alert("Invalid login response (missing _id)");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);