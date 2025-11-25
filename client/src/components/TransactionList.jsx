import React from "react";

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold border-b-2 border-gray-200 pb-2 mb-4 text-gray-700">
        ประวัติธุรกรรม (History)
      </h3>

      <ul className="list-none space-y-3">
        {/* <li className='bg-white shadow-sm p-3 border-r-4 border-red-500 rounded-md flex justify-between items-center hover:shadow-md transition-shadow relative group'>
                <span className='text-gray-700'>ค่ากาแฟ</span>
                <span className='font-bold text-gray-700'>-฿500</span>

                <button className='absolute -left-8 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity'>x</button>
            </li>

            <li className='bg-white shadow-sm p-3 border-r-4 border-green-500 rounded-md flex justify-between items-center hover:shadow-md transition-shadow relative group'>
                <span className='text-gray-700'>เงินเดือน</span>
                <span className='font-bold text-gray-700'>฿20000</span>

                <button className='absolute -left-8 bg-green-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity'>x</button>
            </li> */}
        {transactions.map((transaction) => {
          const sign = transaction.amount < 0 ? "-" : "+";
          const borderColor =
            transaction.amount < 0 ? "border-red-500" : "border-green-500";

          return (
            <li key={transaction._id} className={`bg-white shadow-sm p-3 border-r-4 ${borderColor} rounded-md flex justify-between items-center hover:shadow-md transition-shadow relative group`}>
              <span className="text-gray-700">{transaction.text}</span>
              <span className="font-bold text-gray-700">
                {sign}฿{Math.abs(transaction.amount)}
              </span>

              <button onClick={() => onDelete(transaction._id)} className="absolute -left-8 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">X</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionList;
