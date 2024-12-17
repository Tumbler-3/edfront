import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import { Login, Register, Reset } from "./pages";
import { AuthProvider } from "./features/auth/Auth";

const App = () => {
  return (
    <div className="App">
      <div className="container">App</div>
      <a href="/login">Login</a><br></br>
      <a href="/register">Register</a><br></br>
      <a href="/reset">Refresh</a>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
