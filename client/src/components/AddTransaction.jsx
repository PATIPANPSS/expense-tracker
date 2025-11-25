import React, { useState } from "react";

const AddTransaction = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: +amount
    }
    onAdd(newTransaction);
    setText('');
    setAmount(0);
  }
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold border-b-2 border-gray-200 pb-2 mb-4 text-gray-700">
        เพิ่มรายการใหม่ (Add new transaction)
      </h3>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ชื่อรายการ (Text)
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ระบุชื่อรายการ..."
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            จำนวนเงิน (Amount) <br />
            <span className="text-sm text-gray-500 font-normal">
              (ลบ - สำหรับรายจ่าย, บวก + สำหรับรายรับ)
            </span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="ระบุจำนวนเงิน..."
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          เพิ่มรายการ (Add Transaction)
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
