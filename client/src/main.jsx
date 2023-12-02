import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext.jsx";
// Create a root element for the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application into the root element
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);