import { URL_BASE, tokenKey } from "./constants";

const savedToken = window.localStorage.getItem(tokenKey);

export const authProvider = {
  isAuthenticated: savedToken !== null,
  token: savedToken,
  async login(username: string, password: string) {
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
      authProvider.isAuthenticated = true;
      authProvider.token = body.token;
      window.localStorage.setItem(tokenKey, body.token);
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  },

  async signup(username: string, password: string) {
    const url = URL_BASE + "/signup";
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      this.login(username, password);
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  },
  logout() {
    window.localStorage.removeItem(tokenKey);
    authProvider.isAuthenticated = false;
    authProvider.token = null;
  },
};
