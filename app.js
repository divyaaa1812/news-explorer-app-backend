require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const rateLimiter = require("./middlewares/expressratelimit");

const app = express();
const { PORT = 3002, database } = process.env;
console.log(process.env.NODE_ENV);

const dbUrl =
  process.env.NODE_ENV === "production"
    ? database
    : "mongodb://127.0.0.1:27017/newsxplorer_db";

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

mongoose.connect(dbUrl, () => {
  console.log("connected to DB");
});

app.use(cors());
// app.options("*", cors({ Origin: "https://nx.csproject.org" }));
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
// applying the rate-limiter
app.use(rateLimiter);
app.use(routes);
// enabling the error logger
app.use(errorLogger);
app.use(errors());
// centralized error handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
