const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create({
      text,
      amount,
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    } else {
      console.log("🔥🔥🔥 Error ตัวจริงคือ:", err);
      
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, error: "No transaction found" });
    }

    await transaction.deleteOne();

    res.json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;
