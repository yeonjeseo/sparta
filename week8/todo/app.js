const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
mongoose.connect("mongodb://localhost/todo-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi!");
});

router.get("/todos", async (req, res) => {
  const todos = await Todo.find({}).sort("-order").exec();

  res.send({ todos });
});

router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderTodo = await Todo.findOne().sort("-order").exec();
  let order = 1;

  if (maxOrderTodo) {
    order = maxOrderTodo.order + 1;
  }
  const todo = new Todo({ value, order });
  await todo.save();

  return res.send({ todo });
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id).exec();
    return res.status(200).send({ result: "삭제 성공" });
  } catch (err) {
    return res.status(500).send({ result: "서버 에러" });
  }
});

router.patch("/todos/:id", async (req, res) => {
  const { order, value, done } = req.body;
  const { id } = req.params;

  try {
    //조작할 놈을 하나 찾아놓고
    const todo = await Todo.findById(id).exec();

    //순서 변경
    if (order) {
      const targetTodo = await Todo.findOne({ order }).exec();
      if (targetTodo) {
        targetTodo.order = todo.order;
        await targetTodo.save();
      }
      todo.order = order;
    }

    // 내용 수정
    if (value) {
      todo.value = value;
    }

    //끝낸 날짜
    if (done) {
      todo.doneAt = Date.now();
    } else {
      todo.doneAt = null;
    }

    await todo.save();
    return res.status(200).send({ result: "success" });
  } catch {
    return res.status(500).send({ result: "failure" });
  }
});

app.use("/api", bodyParser.json(), router);
app.use(express.static("./assets"));

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});
