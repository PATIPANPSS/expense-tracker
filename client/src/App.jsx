import { useState, useEffect } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpenses from "./components/IncomeExpenses";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";

import axios from "axios";
import * as XLSX from 'xlsx';

function App() {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const res = await axios.get("https://expense-tracker-api-gp7s.onrender.com/api/transactions");
      setTransactions(res.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`https://expense-tracker-api-gp7s.onrender.com/api/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction._id !== id)
      );
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const addTransaction = async (newTransaction) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "https://expense-tracker-api-gp7s.onrender.com/api/transactions",
        newTransaction,
        config
      );
      setTransactions([...transactions, res.data.data]);
    } catch (err) {
      console.error("Error adding:", err);
    }
  };

  const amount = transactions.map((transaction) => transaction.amount);
  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  const exportToExcel = () => {
    if(transactions.length === 0){
      alert('ไม่มีข้อมูล กรุณาเพิ่มรายการ');
      return;
    }

    const dataToExport = transactions.map(t => ({
      'ชื่อรายการ': t.text,
      'จำนวนเงิน': t.amount,
      'วันที่บันทึก': new Date(t.createdAt).toLocaleDateString('th-TH'),
      'ประเภท': t.amount > 0 ? 'รายรับ' : 'รายจ่าย'
    }))

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'รายรับรายจ่าย');

    const dataStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `Expense_Report_${dataStr}.xlsx`);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-md p-6">
        <Header />
        <Balance total={total} />
        <button onClick={exportToExcel} className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition w-full">
          Export to Excel
        </button>
        <IncomeExpenses income={income} expense={expense} />
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
        />
        <AddTransaction onAdd={addTransaction} />
      </div>
    </div>
  );
}

export default App;
