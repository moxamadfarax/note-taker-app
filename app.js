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

// Function that creates the note.
function createNote(body, notesInfo) {
  const newNote = body;

  // Checks if array or not.
  if (!Array.isArray(notesInfo)) notesInfo = [];
  if (notesInfo.length === 0) notesInfo.push(0);

  body.id = notesInfo[0];
  notesInfo[0]++;
  notesInfo.push(newNote);

  // Appending data into file.
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesInfo, null, 2)
  );
  return newNote;
}

// Function to delete notes.
function deleteNote(id, notesArray) {
  // For loop for making multiple notes.
  for (let i = 0; i < notesArray.length; i++) {
    let note = notesArray[i];
    if (note.id == id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesArray, null, 2)
      );
      break;
    }
  }
}

// Setting up the route that handles HTTP POST requests
app.post("/api/notes", (req, res) => {
  const newNote = createNote(req.body, notes);
  res.json(newNote);
});

// Setting up the route that handles HTTP DELETE requests
app.delete("/api/notes/:id", (req, res) => {
  deleteNote(req.params.id, notes);
  res.json(true);
});

// Listening on port
app.listen(PORT, () => {
  console.log(`Server available on http://localhost:${PORT}`);
});
