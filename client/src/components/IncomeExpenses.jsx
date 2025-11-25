import React from "react";

const IncomeExpenses = ({ income, expense }) => {
  return (
    <div className="flex justify-between bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="text-center w-1/2 border-r border-gray-200">
        <h4 className="text-sm text-gray-500 uppercase">รายรับ (Income)</h4>
        <p className="text-green-500 text-xl font-bold">+฿{income}</p>
      </div>
      <div className="text-center w-1/2">
        <h4 className="text-sm text-gray-500 uppercase">รายจ่าย (Expense)</h4>
        <p className="text-red-500 text-xl font-bold">-฿{expense}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
