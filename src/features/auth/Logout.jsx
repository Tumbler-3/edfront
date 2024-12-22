import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate('/');
    navigate(0);

  }, [navigate]);
  return <div className="logout">Logging out...</div>;
};

export default Logout;
