import { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTMxOWQyNWFhMjMzMzE1NTIxNzBkZSIsImlhdCI6MTY4ODQxMDYzN30.t5nvWegVodscaq8qtbBbeFJ1m_BXEk6kc1Z1k0nkXbE",
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTMxOWQyNWFhMjMzMzE1NTIxNzBkZSIsImlhdCI6MTY4ODQxMDYzN30.t5nvWegVodscaq8qtbBbeFJ1m_BXEk6kc1Z1k0nkXbE",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const note = await response.json();
      setNotes([...notes, note]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTMxOWQyNWFhMjMzMzE1NTIxNzBkZSIsImlhdCI6MTY4ODQxMDYzN30.t5nvWegVodscaq8qtbBbeFJ1m_BXEk6kc1Z1k0nkXbE",
        },
      });

      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTMxOWQyNWFhMjMzMzE1NTIxNzBkZSIsImlhdCI6MTY4ODQxMDYzN30.t5nvWegVodscaq8qtbBbeFJ1m_BXEk6kc1Z1k0nkXbE",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            title: title,
            description: description,
            tag: tag,
          };
        }
        return note;
      });

      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
