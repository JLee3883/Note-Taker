const express = require('express');
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;

const noteList = require("./db/db.json");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(noteList);
});

app.post("/api/notes", (req, res) => {
    req.body.id = noteList.length.toString();
    const newNote = req.body;
    createNewNote(newNote, noteList);
    res.json(newNote);
});

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(noteList, null, 2));
}

app.listen(PORT, () => {
    console.log(`API server now listening on ${PORT}...`);
});