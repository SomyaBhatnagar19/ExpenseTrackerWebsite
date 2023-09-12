import React from "react";

import icon from './assets/icon.png';
const Header = () => {
    return(
        <div className="bg-stone-300">
            <div className="flex gap-3 p-3 items-center">
            <img src={icon} alt="icon" className="w-12 h-12 "/>
            <p className="text-lg text-emerald-700 font-bold italic">Expense Tracker</p>
            </div>
        </div>
    )
}
export default Header;