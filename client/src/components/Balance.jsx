import React from "react";

const Balance = ({ total }) => {
  return (
    <div className="mb-6">
      <h4 className="text-sm text-gray-500 uppercase">
        ยอดเงินคงเหลือ (Your Balance)
      </h4>
      <h1 className="text-4xl font-extrabold text-gray-800">฿{total}</h1>
    </div>
  );
};

export default Balance;
