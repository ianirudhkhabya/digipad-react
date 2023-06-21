import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const initialState = {
    name: "Anirudh",
    class: "final",
  };

  const [state, setState] = useState(initialState);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "Khabya",
      });
    }, 1000);
  };

  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
