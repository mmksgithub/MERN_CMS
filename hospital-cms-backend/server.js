const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Import Routes
const doctorRoutes = require("./routes/doctorRoutes.js");
const photoRoutes = require("./routes/photoRoutes.js");
const aboutUsRoutes = require("./routes/aboutUs.js");
const contactRoutes = require("./routes/contactRoutes.js");
const heroRoutes = require("./routes/heroRoutes.js");
const serviceRoutes = require("./routes/serviceRoutes.js");
const departmentRoutes = require("./routes/departmentRoutes.js");
const linksRoutes = require("./routes/linksRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "./config.env") });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// CORS setup - Allow credentials and both localhost:5173 and localhost:5174
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://vasudevhealthcare.com",
      "https://admin.vasudevhealthcare.com",
      "https://server.vasudevhealthcare.com",
    ],
    credentials: true,
  })
);

// Middleware to parse JSON and handle cookies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route for checking if the user is authenticated
// API Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/about-us", aboutUsRoutes);
app.use("/api/contact-us", contactRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/links", linksRoutes);
app.use("/api/users", userRoutes);
// Logout route to clear the cookie

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Serve frontend in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
