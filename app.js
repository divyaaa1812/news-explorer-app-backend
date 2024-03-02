require("dotenv").config();
const { requestLogger, errorLogger } = require("./middlewares/logger");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/newsxplorer_db", () => {
  console.log("connected to DB");
});

app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
