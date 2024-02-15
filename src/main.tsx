import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "../app/globals.css";
import { ThemeProvider } from "./components/theme-provider";
import "@fontsource-variable/onest";
import "@fontsource/geist-sans/700.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import { AuthProvider } from "./contexts/authContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
