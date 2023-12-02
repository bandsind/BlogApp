import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
// Initialize the Express application
const app = express();

app.use(express.json());
// Middleware to parse cookies from the request headers
app.use(cookieParser());

// Multer configuration for file uploads
const storage = multer.diskStorage({
    // Define where uploaded files should be stored
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  // Define how uploaded files should be named
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// Initialize multer with the specified storage configuration
const upload = multer({ storage });
  // Access the uploaded file from the request
app.post("/server/uploads/upload", upload.single("file"), function (req, res) {
    // Access the uploaded file from the request
  const file = req.file;
  // Send back the filename as a response
  res.status(200).json(file.filename);
});

// Use the defined routes for different parts of the application
app.use("/server/auth", authRoutes);
app.use("/server/routes/users", userRoutes);
app.use("/server/routes/posts", postRoutes);

// app.listen(8800,()=>{
//     console.log("Connected!")
// })
// Define the port on which the server should listen
const PORT = process.env.PORT || 8800;
// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));