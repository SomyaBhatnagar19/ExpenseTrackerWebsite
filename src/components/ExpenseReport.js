// //ExpenseReport
// import React from "react";
// import EditBtn from './assets/Edit.png';
// import DeleteBtn from './assets/Delete.png';

// const ExpenseReport = ({ expenses, onDelete, onEdit }) => {
//   return (
//     <div className="bg-white shadow-md p-6 overflow-x-auto">
//       <table className="w-full border-collapse border border-gray-300 shadow-md">
//         <thead>
//           <tr>
//             <th className="p-2 border border-gray-300">Description</th>
//             <th className="p-2 border border-gray-300">Category</th>
//             <th className="p-2 border border-gray-300">Amount</th>
//             <th className="p-2 border border-gray-300 w-20">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.map((expense, index) => (
//             <tr key={index}>
//               <td className="p-2 border border-gray-300">{expense.description}</td>
//               <td className="p-2 border border-gray-300">{expense.category}</td>
//               <td className="p-2 border border-gray-300">Rs. {expense.amount}</td>
//               <td className="p-2 border border-gray-300 w-20 flex justify-center items-center">
//                 <button className="text-sm border-r pr-1" onClick={() => onEdit(expense)}><img src={EditBtn} alt="edit-btn" /></button>
//                 <button className="text-sm ml-1" onClick={() => onDelete(expense.id)}><img src={DeleteBtn} alt="delete-btn" /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExpenseReport;
import React from "react";
import EditBtn from './assets/Edit.png';
import DeleteBtn from './assets/Delete.png';

const ExpenseReport = ({ expenses, onDelete, onEdit }) => {
  // Calculate total expense
  const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  return (
    <div className="bg-white shadow-md p-6 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">Category</th>
            <th className="p-2 border border-gray-300">Amount</th>
            <th className="p-2 border border-gray-300 w-20">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td className="p-2 border border-gray-300">{expense.description}</td>
              <td className="p-2 border border-gray-300">{expense.category}</td>
              <td className="p-2 border border-gray-300">Rs. {expense.amount}</td>
              <td className="p-2 border border-gray-300 w-20 flex justify-center items-center">
                <button className="text-sm border-r pr-1" onClick={() => onEdit(expense)}><img src={EditBtn} alt="edit-btn" /></button>
                <button className="text-sm ml-1" onClick={() => onDelete(expense.id)}><img src={DeleteBtn} alt="delete-btn" /></button>
              </td>
            </tr>
          ))}
        </tbody>
        
           
         
      </table>
      <span className="p-2 border border-gray-300">Total Expense</span>
      <span className="p-2 border border-gray-300">Rs. {totalExpense}</span>
      {totalExpense>1000 && <button
                  type="button"
                  className="bg-orange-500 text-white p-2 rounded hover:bg-orange-200 ml-2"
                  
                >
                  Activate Premium
                </button>}
    </div>
  );
};

export default ExpenseReport;
