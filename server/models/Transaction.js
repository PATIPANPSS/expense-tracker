const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "กรุณาใส่ชื่อรายการ"],
  },
  amount: {
    type: Number,
    required: [true, "กรุณาใส่จำนวนเงิน"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
