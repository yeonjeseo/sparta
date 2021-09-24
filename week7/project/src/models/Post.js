import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  password: { type: String, required: true },
  comment: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
