import React, { useState } from "react";

//icon
import dropdownIcon from "./assets/dropdown.png";

const ExpenseForm = ({ onExpenseSubmit }) => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onExpenseSubmit(expenseData);
    // Clear the form
    setExpenseData({
      amount: "",
      description: "",
      category: "",
    });
  };

  return (
    <div className="bg-stone-100 min-h-screen p-10">
      <div className="bg-white shadow-md w-full sm:w-full xl:w-full">
        <div className="bg-stone-200 sm:flex sm:justify-between shadow-lg">
          <h4 className="text-lg italic font-semibold border-l-4 border-emerald-700 pl-4 text-emerald-700">
            Add New Expense
          </h4>
        </div>
        <div className="p-3 shadow-md mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 text-md font-semibold mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={expenseData.amount}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div className="relative">
                <label className="text-gray-700 text-md font-semibold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={expenseData.category}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  required
                >
                  <option
                    value=""
                    disabled
                  >
                    Select category of expense from the list
                  </option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Necessity/Body Care">
                    Necessity/Body Care
                  </option>
                  <option value="Fuel/Travel">Fuel/Travel</option>
                  <option value="Education">Education</option>
                  <option value="Electronics">Electronics</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pt-6 pr-2 pointer-events-none">
                  <img
                    src={dropdownIcon}
                    alt="dropdown-icon"
                    className="w-5 h-5 bg-emerald-500 rounded-2xl"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-gray-700 text-md font-semibold mb-2">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={expenseData.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                placeholder="Enter description"
                required
              />
            </div>
            <hr className="border border-emerald-500 my-2"></hr>
            <button
              type="submit"
              className="bg-emerald-700 text-white p-2 rounded hover:bg-emerald-600 "
            >
              Save Expense
            </button>
          </form>
          {/* display the expenses by user */}
        </div>
        {/* <div className="bg-white shadow-md w-full sm:w-full xl:w-full">
      <div className="bg-stone-200 sm:flex sm:justify-between shadow-lg">
        <h4 className="text-lg italic font-semibold border-l-4 border-emerald-700 pl-4 text-emerald-700">
          Expense Report
        </h4>
      </div>
      </div> */}
      </div>
    </div>
  );
};

export default ExpenseForm;
