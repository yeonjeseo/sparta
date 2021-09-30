const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  value: { type: String, required: true },
  doneAt: { type: Date },
  order: { type: Number },
});

ToDoSchema.virtual("todoId").get(function () {
  return this._id.toHexString();
});

ToDoSchema.set("toJSON", {
  virtuals: true,
});

const ToDo = mongoose.model("Todo", ToDoSchema);

module.exports = ToDo;
