import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

// project imports
// import Customization from "../Customization";

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please Login to Continue!");
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default MinimalLayout;
