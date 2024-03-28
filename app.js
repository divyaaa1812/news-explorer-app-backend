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

// const dbUrl =
//   process.env.NODE_ENV === "production"
//     ? database
//     : "mongodb://127.0.0.1:27017/newsxplorer_db";
const dbUrl = "mongodb://127.0.0.1:27017/newsxplorer_db";

console.log(dbUrl);
console.log(process.env);
// app.get("/crash-test", () => {
//   setTimeout(() => {
//     throw new Error("Server will crash now");
//   }, 0);
// });

// app.use((req, res, next) => {
//   let allowedOrigins = [
//     "https://nx.csproject.org",
//     "https://wtwrdivya.crabdance.com",
//   ];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     return res.status(200).json({});
//   }
//   next();
// });

mongoose.connect(dbUrl, () => {
  console.log("connected to DB");
});

app.use(cors());
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
