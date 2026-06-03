const express = require("express");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",express.static("uploads"));

app.use(
  cors({
    origin: "https://gradio-ai-j8m7.vercel.app",
    credentials: true,
  })
);

// Routes
const user = require("./controller/user");
const assignment = require("./controller/assignment.js");
const classes = require("./controller/classes.js");
app.use("/api/v2/user", user);
app.use("/api/v2/assignment", assignment);
app.use("/api/v2/class", classes);

// Error Handler
app.use(ErrorHandler);

module.exports = app;
