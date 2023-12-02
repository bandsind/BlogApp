import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";

// Create a new router object for handling requests
const router = express.Router();

// Route to get all posts or filter posts based on query parameters
// When a GET request is made to '/', it calls the getPosts function from the post controller
router.get("/", getPosts);

// Route to get a single post by ID
// When a GET request is made to '/:id', it calls the getPost function with the post ID
router.get("/:id", getPost);

// Route to add a new post
// When a POST request is made to '/', it calls the addPost function to create a new post
router.post("/", addPost);

// Route to delete a post by ID
// When a DELETE request is made to '/:id', it calls the deletePost function with the post ID
router.delete("/:id", deletePost);

// Route to update an existing post by ID
// When a PUT request is made to '/:id', it calls the updatePost function with the post ID
router.put("/:id", updatePost);

// Export the router for use in the main server file
export default router;
