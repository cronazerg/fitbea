require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 1800000
    }
}));

// CORS
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

// Middleware
app.use(express.json()); // parse json bodies in the request object



// Routes for Users
app.use("/users", require("./routes/userRoutes"));

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, _next) => {
  err.code = undefined;
  err.name = undefined;
  err.stack = undefined;

  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
