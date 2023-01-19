// Necessary equirements and dependencies.
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const notes = require("./db/db.json");

// Required middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Get request to pull from ap and slice() data.
app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

// Get request to my index file.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Get request to my notes file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// This route is handling all GET requests that do not match any other routes defined previously.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
