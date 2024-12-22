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
    if (userExists() === false) {
      navigate("/login");
    }
  }, [navigate]);

  const token = localStorage.getItem("access");
  const user = localStorage.getItem("user");

  useEffect(() => {
    const Fetch_posts = async (e) => {
      let response = await fetch(
        `http://localhost:8000/api/v1/post/author/${userid}/`,
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
  }, [userid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const uploaded_images = e.target.uploaded_images.files;


    let response = await fetch("http://localhost:8000/api/v1/post/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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

  const whose = (userid===user) ? 'Your': "Others'"

  const isAuthor =
    userid === user ? (
      <>
        <div className="createform">
          <h1>Create Post</h1>

          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input id="title" type="text" name="title" />

            {/* <label>Images:</label>
            <input
              type="file"
              name="uploaded_images"
              id="uploaded_images"
              accept="image/png, image/jpeg"
              multiple
            /> */}

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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            From {whose} Blog
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="group relative">
                Author: {post.author_name}
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <Link to={`/post/${post.id}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                {post.images.length === 0
                  ? null
                  : post.images.map((image) => (
                      <img
                        alt=""
                        src={image.thumbnail}
                        className="size-10 bg-gray-50"
                      />
                    ))}
              </div>
              <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                {post.content}
              </p>
              <hr class="dashed" />
            </article>
          ))}
        </div>
      </div>
      {isAuthor}
    </div>
  );
};

export default Posts;
