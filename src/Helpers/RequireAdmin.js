import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ADMIN } from "../config";
import toast from "react-hot-toast";

const RequireAdmin = ({ children }) => {
  let { isAuthenticated, user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.email !== ADMIN) {
      console.log(user);
      toast.error("Restricted access");
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};
export default RequireAdmin;
