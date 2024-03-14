import { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = ({ children }) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    getNotes();
  }, []);

  const createHeaders = () => ({
    "Content-Type": "application/json",
    "auth-token": authToken,
  });

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: createHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const note = await response.json();
      setNotes([...notes, note]);
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: createHeaders(),
      });

      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: createHeaders(),
        body: JSON.stringify({ title, description, tag }),
      });

      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            title,
            description,
            tag,
          };
        }
        return note;
      });

      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
