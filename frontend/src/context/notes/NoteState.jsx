import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "649663701212d86afeabfcb1",
      user: "648d73fd91b0c64b20c443e7",
      title: "One title",
      description: "One des",
      tag: "General",
      date: "2023-06-24T03:30:56.678Z",
      __v: 0,
    },
    {
      _id: "6496637b1212d86afeabfcb3",
      user: "648d73fd91b0c64b20c443e7",
      title: "Two title",
      description: "Two des",
      tag: "General",
      date: "2023-06-24T03:31:07.326Z",
      __v: 0,
    },
    {
      _id: "649663941212d86afeabfcb5",
      user: "648d73fd91b0c64b20c443e7",
      title: "Three title",
      description: "Three des",
      tag: "Personal",
      date: "2023-06-24T03:31:32.547Z",
      __v: 0,
    },
    {
      _id: "649663a61212d86afeabfcb7",
      user: "648d73fd91b0c64b20c443e7",
      title: "Four title",
      description: "Four des",
      tag: "Important",
      date: "2023-06-24T03:31:50.965Z",
      __v: 0,
    },
    {
      _id: "649663bc1212d86afeabfcb9",
      user: "648d73fd91b0c64b20c443e7",
      title: "Five title",
      description: "Five des",
      tag: "General",
      date: "2023-06-24T03:32:12.872Z",
      __v: 0,
    },
    {
      _id: "649663c81212d86afeabfcbb",
      user: "648d73fd91b0c64b20c443e7",
      title: "Six title",
      description: "Six des",
      tag: "General",
      date: "2023-06-24T03:32:24.239Z",
      __v: 0,
    },
    {
      _id: "649663d21212d86afeabfcbd",
      user: "648d73fd91b0c64b20c443e7",
      title: "Seven title",
      description: "Seven des",
      tag: "General",
      date: "2023-06-24T03:32:34.467Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  const addNote = (title, description, tag) => {
    const note = {
      _id: "649663d21212d86afeabfcbd",
      user: "648d73fd91b0c64b20c443e7",
      title: title,
      description: description,
      tag: "General",
      date: "2023-06-24T03:32:34.467Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  return (
    <NoteContext.Provider value={{ notes, addNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
