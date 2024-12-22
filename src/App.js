import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Login, Logout, Register, Reset } from "./features/auth";
import { Posts, Detail } from "./features/post";
import userExists from "./features/auth/User";

const App = () => {
  const User = userExists() ? (
    <>
      <br></br>
      <a href="/logout">Logout</a>
      <br></br>
      <Link to={`/${localStorage.getItem("user")}/posts`}>Your Posts</Link>
    </>
  ) : (
    <>
      <a href="/login">Login</a>
      <br></br>
      <a href="/register">Register</a>
      <br></br>
      <a href="/reset">Refresh</a>
    </>
  );

  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">App</div>
        {User}
        <br></br>
        <a href="/">Main</a>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/:userid/posts" element={<Posts />} />
          <Route path="/post/:postid" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
