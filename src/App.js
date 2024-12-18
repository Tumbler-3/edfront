import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Logout, Register, Reset } from "./features/auth";
import { Posts } from "./features/post";
import userExists from "./features/auth/User";

const App = () => {
  if (userExists) {
    const id = localStorage.getItem("user");
  }

  const User = userExists() ? (
    <>
      <br></br>
      <a href="/logout">Logout</a>
      <br></br>
      <a href="/posts">Posts</a>
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
    <div className="App">
      <div className="container">App</div>
      {User}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
