const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/test");
app.get("/api", (req, res) => {
  res.json({ message: "Backend Working" });
});

module.exports = app;