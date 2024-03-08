require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");

const app = express();
const { PORT = 3002 } = process.env;

console.log(process.env.NODE_ENV);

mongoose.connect("mongodb://127.0.0.1:27017/newsxplorer_db", () => {
  console.log("connected to DB");
});

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(routes);
// enabling the error logger
app.use(errorLogger);
app.use(errors());
// centralized error handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
