//Header
import React from "react";
import { useNavigate } from "react-router-dom";
//icons
import logoutIcon from "./assets/logout.png";
import icon from "./assets/icon.png";
const Header = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    alert("User logged out successfully.");
    navigate("/SignUp");
  };
  return (
    <div className="bg-stone-200 p-5 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <img src={icon} alt="icon" className="w-12 h-12" />
        <p className="text-lg text-emerald-700 font-bold italic">
          Expense Tracker
        </p>
      </div>

      <button onClick={logoutHandler}>
        <img src={logoutIcon} alt="logout-icon" className="w-10 h-10" />
      </button>
    </div>
  );
};
export default Header;
