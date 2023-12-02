import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Register component for handling user registration
const Register = () => {
  // State for input fields for username, email, and password
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State for storing any error messages
  const [err, setError] = useState(null);

  // Hook to navigate programmatically after registration
  const navigate = useNavigate();

  // Function to update state based on form inputs
  const handleChange = (e) => {
    // Update the state with the current input while preserving the other inputs
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Attempt to post the new user data to the registration endpoint
      const res = await axios.post("/server/auth/register", inputs);
      // On successful registration, navigate to the login page
      navigate("/login");
    } catch (err) {
      // If there is an error, store it in state to display
      setError(err.response.data);
    }
  };
  
  // JSX for rendering the registration form
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        {/* Input field for username */}
        <input required type='text' placeholder='username' name='username' onChange={handleChange}/>
        {/* Input field for email */}
        <input required type='email' placeholder='email' name='email' onChange={handleChange}/>
        {/* Input field for password */}
        <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
        {/* Button triggers handleSubmit when clicked */}
        <button onClick={handleSubmit}>Register</button>
        {/* Display error message if present */}
        {err && <p>{err}</p>}
        {/* Link to the login page if the user already has an account */}
        <span>Do you have an account? <Link to="/login"> Login</Link> </span> 
      </form>
    </div>
  );
}

export default Register;
