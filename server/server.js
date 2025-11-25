const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transactions = require("./routes/transactions");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactions);

app.get("/", (req, res) => {
  res.send("Hello from Express Tracker API");
});

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Error: MONGO_URI is missing in .env");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => console.error("DB connection Error:", err));
}
