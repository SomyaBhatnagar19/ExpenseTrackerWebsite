import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex justify-between items-center bg-stone-100 p-2">
      <p className="text-left text-xl italic">Welcome to Expense Tracker!!!</p>
      <p className="text-right text-sm bg-emerald-400 p-1 rounded-2xl">
        Your profile is incomplete. <Link to="/Profile" className="text-blue-700">Complete now</Link>
      </p>
    </div>
  );
};

export default Welcome;
