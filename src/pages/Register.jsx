import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const swal = require("sweetalert2");
  const navigate = useNavigate();


  async function handleSubmit() {
    let response = await fetch("http://localhost:8000/api/v1/user/signup/", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    const data = await response.json();
    console.log("USer created", response.status);
    if (response.status === 201) {
      swal.fire({
        title: "Registration Success",
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
      console.log(data);
      swal.fire({
        title: "User Exist",
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
    <div className="register">
      <h1>Register</h1>
      <p>Create a new account</p>

      <form>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          required
          value={username}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          value={password}
        />

        <div className="btn-container">
          <button onClick={handleSubmit} type="button">
            Register
          </button>
        </div>
        <span>
          Already Have an Account;
          <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
