import { useState, useCallback, useEffect } from "react";
const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setuserId] = useState(null);

  const login = useCallback((jwt, id) => {
    setToken(jwt);
    setuserId(id);
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwt })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setuserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);
  return { login, logout, token, userId, ready };
};
