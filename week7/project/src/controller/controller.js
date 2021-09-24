import mongoose from "mongoose";
import Post from "../models/post.js";

export const home = async (req, res) => {
  return res.render("index");
};

export const getComment = async (req, res) => {
  return res.render("comment");
};

export const postComment = async (req, res) => {
  const { title, author, comment, password } = req.body;
  const post = {
    title,
    author,
    comment,
    password,
  };

  await Post.create(post);

  return res.send({ result: "success" });
};

export const patchComment = async (req, res) => {
  // const id = req.params.id;
  const id = mongoose.Types.ObjectId("614d9aa8d5ee753a4cda3e7d");
  // console.log(req.params.id);
  // const { title, comment } = req.body;
  const post = {
    title: "Changed title",
    comment: "Changed Comment",
  };

  await Post.findByIdAndUpdate(id, {
    $set: post,
  });
  console.log(post);

  // const post = Post.findByIdAndUpdate(id, {
  //   $set: {
  //     title,
  //     comment,
  //   },
  // });

  return res.send({ result: "Update success" });
};
