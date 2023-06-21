import React from "react";

const Home = () => {
  return (
    <>
      <div className="container my-3">
        <h2>Add note</h2>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              <h4>Title</h4>
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              <h4>Description</h4>
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <div className="container my-3">
        <h2>Your Notes</h2>
      </div>
    </>
  );
};

export default Home;
