const express = require("express");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: "https://gradio-ai-j8m7.vercel.app",
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const user = require("./controller/user");
const assignment = require("./controller/assignment.js");
const classes = require("./controller/classes.js");

app.use("/api/v2/user", user);
app.use("/api/v2/assignment", assignment);
app.use("/api/v2/class", classes);

app.use(ErrorHandler);

module.exports = app;