import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const swal = require("sweetalert2");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    swal.fire({
      title: "Logout Success",
      icon: "success",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });

    navigate('/');
    navigate(0);

  }, [navigate]);
  return <div className="logout">Logging out...</div>;
};

export default Logout;
