import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Reset = () => {
  
  const swal = require("sweetalert2");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target)

    const email = e.target.email.value;

    const response = await fetch("http://localhost:8000/reset/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log("We send link to the email", data);
    navigate("/");
    swal.fire({
      title: "Link sent to the email",
      icon: "success",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  return (
    <div className="reset">
      <h1>Refresh password</h1>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" required />

        <div className="btn-container">
          <button type="submit">Login</button>
        </div>
        <span>
          I know my password
          <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Reset;
