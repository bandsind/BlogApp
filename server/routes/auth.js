import express from "express";
import { register, login, logout } from "../controllers/auth.js";

// Create a new router object
const router = express.Router();

// Route for user registration
// When a POST request is made to '/register', the register function from the auth controller is called
router.post("/register", register);

// Route for user login
// When a POST request is made to '/login', the login function from the auth controller is called
router.post("/login", login);

// Route for user logout
// When a POST request is made to '/logout', the logout function from the auth controller is called
router.post("/logout", logout);

// Export the router for use in the main server file
export default router;
