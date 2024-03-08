require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");
const rateLimit = require("express-rate-limit");

const app = express();
const { PORT = 3002 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15 minutes
  max: 100, // you can make a maximum of 100 requests from one IP
});

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
// applying the rate-limiter
app.use(limiter);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
