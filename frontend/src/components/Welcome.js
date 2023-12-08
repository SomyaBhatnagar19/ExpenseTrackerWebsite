// //Welcome
// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleTheme } from "../store/theme";
// //icons
// import darkIcon from "./assets/dark.png";
// import lightIcon from "./assets/light.png";
// const Welcome = () => {
//   const dispatch = useDispatch();
//   const darkMode = useSelector((state) => state.theme.darkMode);

//    const themeModeHandler = () => {
//     dispatch(toggleTheme());
//   };

//   return (
//     <>
//     <div className="flex justify-between items-center bg-stone-100 p-2">
//       <p className="text-left text-xl italic">Welcome to Expense Tracker!!!</p>
//       <p className="text-right text-sm bg-emerald-400 p-1 rounded-2xl">
//         Your profile is incomplete. <Link to="/Profile" className="text-blue-700">Complete now</Link>
//       </p>
//     </div>
//     {/* logic for theme */}
//     <div className="absolute top-24 right-4 flex items-center">
//     <button
//       onClick={themeModeHandler}
//       className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
//     >
//       {darkMode ? (
//         <img src={darkIcon} alt="Dark Mode Icon" className="w-5 h-5" />
//       ) : (
//         <img src={lightIcon} alt="Light Mode Icon" className="w-5 h-5" />
//       )}
//       <span className="ml-2">{darkMode ? "Dark Mode" : "Light Mode"}</span>
//     </button>
//   </div>
//   </>
//   );
// };

// export default Welcome;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/theme";
import darkIcon from "./assets/dark.png";
import lightIcon from "./assets/light.png";
import hiWaveIcon from "./assets/hi.png";

const Welcome = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const themeModeHandler = () => {
    dispatch(toggleTheme());
  };

  const handleProfileClick = () => {
    navigate("/UserDetails");
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-stone-100 p-2">
        <p className="text-left text-xl italic">Welcome to Expense Tracker!!!</p>
        <p className="text-right text-sm bg-emerald-400 p-1 rounded-2xl">
          {userName ? (
            <button onClick={handleProfileClick} className="text-blue-700">
              View {userName}'s Details
            </button>
          ) : (
            <Link to="/Profile" className="text-blue-700">
              Complete your profile
            </Link>
          )}
        </p>
      </div>
      <div className="absolute top-24 right-4 flex items-center">
        <button
          onClick={themeModeHandler}
          className={`px-4 py-2 rounded-lg shadow-lg text-sm ${
            darkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <img src={darkMode ? darkIcon : lightIcon} alt="Theme Mode Icon" className="w-5 h-5" />
          <span className="ml-2">{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </div>
      <div
        className={`min-h-screen flex items-center justify-center p-4 ${
          darkMode ? "bg-white" : "bg-slate-900"
        }`}
      >
        <div className="Container bg-slate-100 p-2 shadow-xl rounded-lg flex border-2 border-emerald-700 flex items-center">
          <div className="bg-emerald-700 rounded-full p-3">
            <img src={hiWaveIcon} alt="hi-wave" className="w-20 h-20 bg-emerald-700 rounded-full" />
          </div>
          {userName ? (
            <>
            <h1 className="text-md text-emerald-700 font-bold ml-4">
              Hi {userName}, you can now add your expenses.
            </h1>
            <button onClick={handleProfileClick} className="bg-emerald-700 text-white p-2 rounded hover:bg-emerald-600">
            View Details & add expenses.
          </button>
          </>
          ) : (
            <Link to="/Profile" className="text-blue-700">
              Complete your profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;


