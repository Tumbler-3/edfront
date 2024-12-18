import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userExists from "../auth/User";

const Posts = () => {
  if (userExists() === false) {
    navigate("/login");
  }

  const swal = require("sweetalert2");
  const navigate = useNavigate();

  const token = localStorage.getItem("access").replace(/^"|"$/g, "");
  const user = localStorage.getItem("user");

  const posts = fetch(`http://localhost:8000/api/v1/post/author/${user}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    let response = await fetch("http://localhost:8000/api/v1/post/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        Authorization: `Bearer ${token}`,
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
  };

  return (
    <div className="postform">
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input id="title" type="text" name="title" required />

        <label>Text:</label>
        <input id="content" type="text" name="content" required />

        <div className="btn-container">
          <button type="submit">Create Post</button>
        </div>
        <span>
          <Link to="/">Back</Link>
        </span>
      </form>
    </div>
  );
};

export default Posts;
