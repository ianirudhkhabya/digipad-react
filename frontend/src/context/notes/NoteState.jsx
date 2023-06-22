import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "648e5ce789ac0ded23b1301f",
      user: "648d73fd91b0c64b20c443e7",
      title: "Testing",
      description: "Testing Tested",
      tag: "General",
      date: "2023-06-18T01:24:55.165Z",
      __v: 0,
    },
    {
      _id: "6494490790372c8ea32ee993",
      user: "648d73fd91b0c64b20c443e7",
      title: "Hello",
      description: "basic note",
      tag: "General",
      date: "2023-06-22T13:13:43.963Z",
      __v: 0,
    },
    {
      _id: "6494491590372c8ea32ee995",
      user: "648d73fd91b0c64b20c443e7",
      title: "World",
      description: "next note",
      tag: "General",
      date: "2023-06-22T13:13:57.924Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
