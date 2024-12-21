import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import userExists from "../auth/User";

const Detail = () => {
  const navigate = useNavigate();

  
  useEffect(() => {
    if (userExists() === false) {
      navigate("/login"); // Navigate to login if the user doesn't exist
    }
  }, [navigate]);


  const { postid } = useParams();
  const [post, setPost] = useState([]);
  const swal = require("sweetalert2");
  const token = localStorage.getItem("access");
  const user = localStorage.getItem("user");


  useEffect(() => {
    const Fetch_post = async () => {
      let response = await fetch(
        `http://127.0.0.1:8000/api/v1/post/${postid}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      let data = await response.json();
      setPost(data);
    };
    Fetch_post();
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    let patch_data = {};
    if (title.trim()) {
      patch_data.title = title;
    }
    if (content.trim()) {
      patch_data.content = content;
    }

    let response = await fetch(`http://localhost:8000/api/v1/post/${postid}/`, {
      method: "PATCH",
      body: JSON.stringify(patch_data),
      headers: {
        Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      swal.fire({
        title: "Post Edited",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(0);
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

  const isAuthor =
    post.author === parseInt(user) ? (
      <>
        <div className="patchform">
          <h1>Create Post</h1>

          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input id="title" type="text" name="title" />

            <label>Text:</label>
            <textarea id="content" type="text" name="content"></textarea>

            <div className="btn-container">
              <button type="submit">Edit Post</button>
            </div>
            <span>
              <Link to="/">Back</Link>
            </span>
          </form>
        </div>
      </>
    ) : (
      <></>
    );

  return (
    <div>
      {isAuthor}
      <div className="posts">
        <div key={postid}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
