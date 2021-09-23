const mongoose = require("mongoose");
const { render } = require("ejs");
const express = require("express");
const app = express();
const port = 3000;

const connect = require("./schemas");
connect();

// const goodsRouter = require("./routes/goods");
const userRouter = require("./routes/user");

const goodsRouter = require("./routers/goods");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", [goodsRouter]);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// use virtual file system in browser
// app.use("/uploads", express.static("uploads"));
app.use("/", express.static("public"));

app.use((req, res, next) => {
  next();
});

app.use("/goods", goodsRouter);
app.use("/user", userRouter);

app.get("/test", (req, res) => {
  let name = req.query.name;
  console.log(req.query);
  res.render("test", { name });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/detail", (req, res) => {
  console.log(req.query);
  res.render("detail");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
