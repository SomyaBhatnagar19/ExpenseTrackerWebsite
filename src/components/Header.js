// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logoutIcon from "./assets/logout.png";
// import icon from "./assets/icon.png";

// const Header = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const userName = localStorage.getItem("userName");
//   const userImage = localStorage.getItem("userImage");

//   const logoutHandler = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("userImage");
//     alert("User logged out successfully.");
//     navigate("/SignUp");
//   };

//   return (
//     <div className="bg-stone-200 p-5 flex items-center justify-between shadow-lg">
//       <div className="flex items-center gap-3">
//         <img src={icon} alt="icon" className="w-12 h-12" />
//         <p className="text-lg text-emerald-700 font-bold italic">
//           Expense Tracker
//         </p>
//       </div>

//       {token ? (
//         <div className="flex items-center gap-5">
//           {userName && (
//             <p className="text-emerald-700">{`Welcome, ${userName}`}</p>
//           )}
//           {userImage && (
//             <img src={userImage} alt="User Profile" className="w-10 h-10" />
//           )}
//           <button onClick={logoutHandler}>
//             <img src={logoutIcon} alt="logout-icon" className="w-10 h-10" />
//           </button>
//         </div>
//       ) : (
//         <Link to="/SignUp" className="text-emerald-700">
//           Sign Up
//         </Link>
//       )}
//     </div>
//   );
// };

// export default Header;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoutIcon from "./assets/logout.png";
import icon from "./assets/icon.png";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const userImage = localStorage.getItem("userImage");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");
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

      {token ? (
        <div className="flex items-center gap-5">
          {userName && (
            <p className="text-emerald-700">{`Welcome, ${userName}`}</p>
          )}
          {/* {userImage && (
            <img src="userImage" alt="User Profile" className="w-10 h-10" />
          )} */}
          <button onClick={logoutHandler}>
            <img src={logoutIcon} alt="logout-icon" className="w-10 h-10" />
          </button>
        </div>
      ) : (
        <Link to="/SignUp" className="text-emerald-700">
          Sign Up
        </Link>
      )}
    </div>
  );
};

export default Header;

