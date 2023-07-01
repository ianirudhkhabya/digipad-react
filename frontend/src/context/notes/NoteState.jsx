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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGQ3M2ZkOTFiMGM2NGIyMGM0NDNlNyIsImlhdCI6MTY4Nzc5ODk0MH0.8ZtxFqosrw8EXP7o67QxP5vUD3ZKkRO1S1y9DJ_wJvE",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGQ3M2ZkOTFiMGM2NGIyMGM0NDNlNyIsImlhdCI6MTY4Nzc5ODk0MH0.8ZtxFqosrw8EXP7o67QxP5vUD3ZKkRO1S1y9DJ_wJvE",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();

      const note = {
        _id: "649663d21212d86afeabfcbd",
        user: "648d73fd91b0c64b20c443e7",
        title: title,
        description: description,
        tag: "General",
        date: "2023-06-24T03:32:34.467Z",
        __v: 0,
      };
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGQ3M2ZkOTFiMGM2NGIyMGM0NDNlNyIsImlhdCI6MTY4Nzc5ODk0MH0.8ZtxFqosrw8EXP7o67QxP5vUD3ZKkRO1S1y9DJ_wJvE",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGQ3M2ZkOTFiMGM2NGIyMGM0NDNlNyIsImlhdCI6MTY4NzAzMDkxMn0.gKft6Y8trXLWw0ddzXonS4DeIaQ7cW-AxgsGoUHcsd4",
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
