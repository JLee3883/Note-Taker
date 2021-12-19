const express = require('express');
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const path = require("path");
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", (req, res) => {
    res.json(noteList);
});

app.listen(PORT, () => {
    console.log(`API server now listening on ${PORT}...`);
});