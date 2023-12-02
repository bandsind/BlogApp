import { db } from "../db.js";
import jwt from "jsonwebtoken";

// Function to retrieve posts, with an optional category filter
export const getPosts = (req, res) => {

  // SQL query changes based on whether a category is specified
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  // SQL query to get post details including user information
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img  AS userImg,`cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

// Function to add a new post
export const addPost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // SQL query to insert a new post
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

       // Values to insert
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

     // Execute the insert query
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};


// Function to delete a post
export const deletePost = (req, res) => {
  // Verify the JWT token from cookies to authenticate the user
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenicated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

// SQL query to delete the post
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

 // Execute the delete query
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err)
        return res.status(403).json("You can only delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

// Function to update an existing post
export const updatePost = (req, res) => {

  // Verify the JWT token from cookies to authenticate the user
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

     // SQL query to update the post
    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    // Values to update
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    // Execute the update query
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
