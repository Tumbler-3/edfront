import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setauthTokens] = useState(() =>
    localStorage.getItem("authToken") ? JSON.parse("authToken") : null
  );

  const [user, setuser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const contextData = {
    user,
    setuser,
    authTokens,
    setauthTokens,
  };

  useEffect(() => {
    if (authTokens) {
      setuser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
