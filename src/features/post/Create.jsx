import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userExists from "../auth/User";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const swal = require("sweetalert2");
  const navigate = useNavigate();

  async function handleSubmit() {

    if (userExists() === false) {
        navigate('/login')
    }

    let response = await fetch("http://localhost:8000/api/v1/post/", {
      method: "POST",
      body: JSON.stringify({ title, text }),
      headers: {
        Authorization: "Bearer ${bearer}",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      swal.fire({
        title: "Post Created",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "Error",
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  }

  return (
    <div className="postform">
      <h1>Register</h1>
      <p>Create a new account</p>

      <form>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          required
          value={title}
        />

        <label>Text:</label>
        <input
          type="text"
          name="text"
          onChange={(e) => setText(e.target.value)}
          required
          value={text}
        />

        <div className="btn-container">
          <button onClick={handleSubmit} type="button">
            Create Post
          </button>
        </div>
        <span>
          <Link to="/">Back</Link>
        </span>
      </form>
    </div>
  );
};

export default CreatePost;
