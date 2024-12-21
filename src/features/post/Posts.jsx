import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import userExists from "../auth/User";

const Posts = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [posts, setPosts] = useState([]);
  const swal = require("sweetalert2");


  useEffect(() => {
    // Check if the user exists, and if not, navigate to login
    if (userExists() === false) {
      navigate("/login"); // Navigate before any other logic
    }
  }, [navigate]);


  const token = localStorage.getItem("access");
  const user = localStorage.getItem("user");


  useEffect(() => {
    const Fetch_posts = async (e) => {
      let response = await fetch(
        `http://localhost:8000/api/v1/post/author/${user}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      let data = await response.json();
      setPosts(data);
    };
    Fetch_posts();
  }, [user]);


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
  

  return (
    <div>
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
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index}>
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <a href=""></a>
            <p>{post.image}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
