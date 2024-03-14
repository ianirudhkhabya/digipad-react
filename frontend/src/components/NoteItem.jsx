import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = ({ note, updateNote, showAlert }) => {
  const { deleteNote } = useContext(noteContext);

  const handleDelete = () => {
    deleteNote(note._id);
    showAlert("success", "Deleted successfully");
  };

  const handleUpdate = () => {
    updateNote(note);
  };

  return (
    <div className="col-md-3" key={note._id}>
      <div className="card my-3 ">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="far fa-trash-alt mx-2" onClick={handleDelete}></i>
            <i className="far fa-edit mx-2" onClick={handleUpdate}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
