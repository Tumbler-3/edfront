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
  }, [user, postid]);

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

  const deletePost = async (e) => {
    let response = await fetch(`http://localhost:8000/api/v1/post/${postid}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.status === 200) {
      swal.fire({
        title: "Post Deleted",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/");
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
          <h1>Edit Post</h1>

          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input id="title" type="text" name="title" />

            <label>Text:</label>
            <textarea id="content" type="text" name="content"></textarea>

            <div className="btn-container">
              <button type="submit">Edit Post</button>
            </div>
          </form>
        </div>
        <div>
          <form onSubmit={deletePost}>
            <label>Delete Post</label>
            <div className="btn-container">
              <button type="submit">Delete Post</button>
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
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {post.images === undefined
          ? null
          : post.images.map((image) => (
              <img
                alt=""
                src={image.image}
                className="size-10 rounded-full bg-gray-50"
              />
            ))}
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-indigo-600">
                Author: {post.author_name}
              </p>
              <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 text-xl/8 text-gray-700">{post.content}</p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"></div>
      </div>
      {isAuthor}
    </div>
  );
};

export default Detail;
