const express = require("express");
const mongoose = require("mongoose");

// ✅ DEFINE APP FIRST
const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(express.json());

// ---------------- DATABASE ----------------
mongoose.connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// ---------------- MODEL ----------------
const dataSchema = new mongoose.Schema({
  text: String
});

const Data = mongoose.model("Data", dataSchema);

// ---------------- ROUTES ----------------

// GET API
app.get("/api", (req, res) => {
  res.json({ message: "Backend Working" });
});

// POST API
app.post("/api/data", async (req, res) => {
  const newData = new Data(req.body);
  await newData.save();

  res.json({
    message: "Data saved",
    data: newData
  });
});

// GET ALL DATA
app.get("/api/data", async (req, res) => {
  const allData = await Data.find();
  res.json(allData);
});

// ---------------- SERVER ----------------
if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
}

// ---------------- EXPORT ----------------
module.exports = app;