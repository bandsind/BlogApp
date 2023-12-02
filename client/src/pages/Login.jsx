import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

// Login component for handling user authentication
const Login = () => {
  // State for input fields
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  // State for error message
  const [err, setError] = useState(null);

  // Hook to navigate programmatically after login
  const navigate = useNavigate();

  // Extracting login function from AuthContext
  const { login } = useContext(AuthContext);

  // Function to handle input changes and update state
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await login(inputs); // Attempt to log in with the provided inputs
      navigate("/"); // Navigate to the homepage on successful login
    } catch (err) {
      // Error handling
      if (err.response && err.response.data) {
        // Set the error message from server response
        setError(err.response.data);
      } else {
        // Set a general error message if no response data is available
        setError('An error occurred during login');
      }
    }
  };
  
  // JSX for rendering the login form
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        {/* Button triggers handleSubmit when clicked */}
        <button onClick={handleSubmit}>Login</button>
        {/* Display error message if present */}
        {err && <p>{err}</p>}
        {/* Link to the register page if the user needs to create an account */}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
