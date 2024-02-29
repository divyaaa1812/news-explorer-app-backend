const mongoose = require("mongoose");
const express = require("express");
const app = express();
const routes = require("./routes");

mongoose.connect("mongodb://127.0.0.1:27017/newsxplorer_db", () => {
  console.log("connected to DB");
});

app.use(express.json());
app.use(routes);
