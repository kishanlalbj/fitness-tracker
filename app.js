const express = require("express");
const path = require("path");
const createHttpError = require("http-errors");
// const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const metricRouter = require("./routes/metric");
const helmet = require("helmet");
const cache = require("./middlewares/cache");

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") require("dotenv").config({});

const PORT = process.env.PORT || 4000;

require("./db");
const app = express();

app.use(helmet({}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
// app.use(cache);
app.use(express.static(path.join(__dirname, "client", "dist")));

app.use("/api/auth", userRouter);
app.use("/api/metrics", metricRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

app.use("*", (req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port...: ${PORT} 🚀`);
});
