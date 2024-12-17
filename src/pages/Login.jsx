import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {

  const swal = require("sweetalert2");
  const navigate = useNavigate();
  const [authTokens, setauthTokens] = useState(() =>
    localStorage.getItem("authToken") ? JSON.parse("authToken") : null
  );
  const [user, setuser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken"))
      : null
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target)

    const username = e.target.username.value;
    const password = e.target.password.value;

    const response = await fetch("http://127.0.0.1:8000/api/token/create/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setauthTokens(data);
      setuser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      console.log("data", data);
      navigate("/");
      swal.fire({
        title: "Login Success",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      console.log(response.status);
      console.log("An Error Occured");
      swal.fire({
        title: "Email - Password does not exist",
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
    <div className="login">
      <h1>Login</h1>
      <p>Sign Into Your Account</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" name="username" required />

        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password" required />

        <div className="btn-container">
          <button type="submit">Login</button>
        </div>
        <span>
          Don't Have an Account;
          <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
