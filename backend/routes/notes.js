const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title should be valid!").isLength({ min: 3 }),
    body("description", "Description must be at least 3 words").isLength({
      min: 7,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: "Please add all the fields" });
      }

      const note = new Note({ user: req.user.id, title, description, tag });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }
);

// Route 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};

    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: newNote },
      { new: true }
    );

    if (!note) {
      return res
        .status(404)
        .json({ error: "Note not found or you don't have permission" });
    }

    res.json({ note });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res
        .status(404)
        .json({ error: "Note not found or you don't have permission" });
    }

    res.json({ success: "Note deleted successfully", note });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;
