import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Home = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;

  return (
    <>
      <div className="container my-3">
        <h2>Add note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h4>Title</h4>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <h4>Description</h4>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <div className="container my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return note.title;
        })}
      </div>
    </>
  );
};

export default Home;
