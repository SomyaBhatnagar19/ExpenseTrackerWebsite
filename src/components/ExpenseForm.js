import React, { useState, useEffect } from "react";
import axios from "axios";
//icon
import dropdownIcon from "./assets/dropdown.png";
import AddExpenseIcon from "./assets/addExpense.png";
import ExpenseReportIcon from "./assets/expenseReport.png";

//file
import ExpenseReport from "./ExpenseReport";

const ExpenseForm = ({ onExpenseSubmit }) => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "",
  });

  const [expenses, setExpenses] = useState([]);

  const realtimeDbFirebase =
    "https://expensetracker-20504-default-rtdb.firebaseio.com/Expenses.json";

  // Function to fetch expenses as soon as the user adds making the useeffect for same below
  const fetchExpenses = () => {
    axios
      .get(realtimeDbFirebase)
      .then((response) => {
        const data = response.data;
        if (data) {
          const expensesArray = Object.values(data);
          setExpenses(expensesArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };

  useEffect(() => {
    fetchExpenses(); // Fetch expenses when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(realtimeDbFirebase, expenseData)
      .then((response) => {
        console.log("Expense added successfully:", response);
        setExpenseData({
          amount: "",
          description: "",
          category: "",
        });

        // Fetch updated expenses after adding a new one
        fetchExpenses();
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
      });
  };
  return (
    <div className="bg-stone-100 min-h-screen p-10">
      <div className="bg-white shadow-md w-full sm:w-full xl:w-full">
        <div className="bg-stone-200 sm:flex sm:justify-between shadow-lg">
          <h4 className="text-lg italic font-semibold border-l-4 border-emerald-700 pl-4 text-emerald-700 flex items-center justify-between">
            Add New Expense
            
              <img
                src={AddExpenseIcon}
                alt="addExpense-icon"
                className="w-10 h-10 p-1"
              />
            
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
                  <option value="" disabled>
                    Select category of expense
                  </option>
                  <option value="Salary">Salary</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Necessity/Body Care">
                    Necessity/Body Care
                  </option>
                  <option value="Fuel/Travel">Snacks/ Junk Food</option>
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
        </div>
        <div className="bg-white shadow-md">
          <div className="bg-stone-200 sm:flex sm:justify-between shadow-lg">
            <h4 className="text-lg italic font-semibold border-l-4 border-emerald-700 pl-4 text-emerald-700 flex items-center justify-between">
              Expense Report
              <div className="me-auto">
                <img
                  src={ExpenseReportIcon}
                  alt="expenseReport-icon"
                  className="w-10 h-10 p-1"
                />
              </div>
            </h4>
          </div>

          {expenses.length > 0 ? (
            <ExpenseReport expenses={expenses} />
          ) : (
            <p>No expenses to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
