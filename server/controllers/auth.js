import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to register a new user
export const register = (req, res) => {
  // SQL query to check if a user with the same email or username already exists
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  // Execute the query
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    // Return an error response if there's a database error
    if (err) return res.status(500).json(err);

    // If a user already exists, return a conflict error
    if (data.length) return res.status(409).json("User already exists!");

    // If the user doesn't exist, hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // SQL query to insert the new user into the database
    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    // Execute the insert query
    db.query(q, [values], (err, data) => {
      // Return an error response if there's a database error
      if (err) return res.status(500).json(err);

      // Return a success response
      return res.status(200).json("User has been created.");
    });
  });
};

// Function to login a user
export const login = (req, res) => {
  // SQL query to find the user by username
  const q = "SELECT * FROM users WHERE username = ?";

  // Execute the query
  db.query(q, [req.body.username], (err, data) => {
    // Return an error response if there's a database error
    if (err) return res.status(500).json(err);

    // If the user is not found, return a not found error
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check if the provided password is correct
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    // If the password is incorrect, return an error response
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    // Generate a JWT token
    const token = jwt.sign({ id: data[0].id }, "jwtkey");

    // Exclude the password from the response data
    const { password, ...other } = data[0];

    // Set the token in a cookie and return the user data
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

// Function to logout a user
export const logout = (req, res) => {
  // Clear the authentication cookie
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.")
};
