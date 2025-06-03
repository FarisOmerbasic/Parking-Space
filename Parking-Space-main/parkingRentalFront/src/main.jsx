import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./services/AuthProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <AuthProvider>
        <App />
      </AuthProvider>
    
  </React.StrictMode>
);
