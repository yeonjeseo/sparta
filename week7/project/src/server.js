import express from "express";
import globalRouter from "./routers/rootRouter.js";
import apiRouter from "./routers/apiRouter.js";
import db from "./db.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");
// console.log(process.cwd() + "/views");

// serve local files to virtual browser file system
app.use("/static", express.static("client"));

app.use("/", globalRouter);
app.use("/api", apiRouter);

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT}😀`);
};

app.listen(PORT, handleListening);
