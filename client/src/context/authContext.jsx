import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Creating a new context for authentication
export const AuthContext = createContext();

// AuthContextProvider component that will wrap your app components
export const AuthContextProvider = ({ children }) => {
  // State for storing the current user
  // Initially tries to load the user from localStorage
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  
  // Function to handle login
  // Takes user input, sends a request to the server, and updates the currentUser state
  const login = async (inputs) => {
    const res = await axios.post("/server/auth/login", inputs);
    setCurrentUser(res.data);
  };

  // Function to handle logout
  // Sends a request to the server to logout and clears the currentUser state
  const logout = async () => {
    await axios.post("/server/auth/logout");
    setCurrentUser(null);
  };

  // useEffect hook to update localStorage whenever currentUser changes
  // This ensures that the current user's data is saved across sessions
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // The provider component makes the currentUser, login, and logout functions
  // available to any child components that need to consume this context
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
