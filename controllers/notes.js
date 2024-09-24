// controllers/notes.js
import { Note } from "../db/index.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { content } = req.body;
    console.log(req.body);
    
    if (!content) {
      return res
        .status(400)
        .json({ error: "Please provide content" });
    }
    const note = await Note.create(req.body);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const {
      body: { content },
      params: { id },
    } = req;
    if (!content)
      return res
        .status(400)
        .json({ error: "content is required" });
    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    await note.update(req.body);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    await note.destroy();
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
