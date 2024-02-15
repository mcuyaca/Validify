import * as React from "react";
import { URL_BASE, tokenKey } from "../constans";

const authContext = React.createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const savedToken = window.localStorage.getItem(tokenKey);

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  async function login(username: string, password: string) {
    const url = URL_BASE + "/login";
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const body = await response.json();
      setToken(body.token);
      window.localStorage.setItem(tokenKey, body.token);
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  }

  function logout() {
    setToken(null);
    window.localStorage.removeItem(tokenKey);
  }

  return (
    <authContext.Provider value={{ token, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(authContext);
}
