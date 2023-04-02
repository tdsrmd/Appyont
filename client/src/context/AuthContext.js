import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

export const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  const [role, setRole] = useState();
  const [setupInfo, setSetupInfo] = useState(false);

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (user) {
      const { token } = user;
      const decodedToken = jwtDecode(token);
      const expirationDateTime = new Date(decodedToken.exp * 1000).getTime() / 1000;
      const now = new Date().getTime() / 1000;

      if (now > expirationDateTime) {
        logout();
        navigate("/girisyap");
      }
      if (decodedToken.role) setRole(decodedToken.role);
    }
  }, [navigate, user]);

  const data = {
    user,
    setUser,
    logout,
    role,
    setupInfo,
    setSetupInfo,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);
