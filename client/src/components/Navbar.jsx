import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  // Using the useContext hook to access the current user and logout function from AuthContext
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="links">
          {/* Each Link component navigates to the home page with a specific category as a query parameter */}
          <Link className="link" to="/?cat=crops">
            <h6>CROPS</h6>
          </Link>
          <Link className="link" to="/?cat=livestock">
            <h6>LIVESTOCK</h6>
          </Link>
          <Link className="link" to="/?cat=sustainability">
            <h6>SUSTAINABILITY</h6>
          </Link>
          <Link className="link" to="/?cat=tech">
            <h6>TECH</h6>
          </Link>
          <Link className="link" to="/?cat=markets">
            <h6>MARKETS</h6>
          </Link>

          {/* Display current user's username if logged in, otherwise show Login link */}
          {currentUser ? (
            <>
              <span>{currentUser.username}</span>
              <span onClick={logout}>Logout</span> {/* Logout functionality */}
            </>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}

          {/* Link to the Write page */}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
