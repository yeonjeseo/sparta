import mongoose from "mongoose";
import Post from "../models/post.js";
import bcrypt from "bcrypt";

export const home = async (req, res) => {
  return res.render("main");
};

export const getComment = async (req, res) => {
  return res.render("create");
};

export const getDetail = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  console.log(post);
  return res.render("detail", { post });
};
// CRUD : C
export const postComment = async (req, res) => {
  const { title, author, comment } = req.body;
  let password = req.body.password;

  password = await bcrypt.hash(password, 5);

  const post = {
    title,
    author,
    comment,
    password,
  };

  await Post.create(post);

  return res.send({ result: "success" });
};

// CRUD : Read
export const readAllComment = async (req, res) => {
  const comments = await Post.find({}).sort({ createdAt: -1 });
  console.log(comments);
  return res.status(200).send({ result: "READ all success", comments });
};

// CRUD : U
export const patchComment = async (req, res) => {
  const { title, author, comment, password } = req.body;
  const { id } = req.params;

  const post = await Post.findById(id);

  // const isMatched = bcrypt.compare(password);

  console.log(post);
  // try {
  //   await Post.findByIdAndUpdate(id, {
  //     $set: post,
  //   });
  //   console.log(post);
  //   return res.status(200).send({ result: "UPDATE success" });
  // } catch {
  //   return res.status(400).send({ result: "UPDATE failure" });
  // }
};

// CRUD : D
export const deleteComment = async (req, res) => {
  const id = mongoose.Types.ObjectId("614dbfce5fbf9e6decaf7d2c");
  try {
    await Post.findByIdAndRemove(id);
    return res.status(200).send({ result: "DELETE success" });
  } catch {
    return res.status(404).send({ result: "DELETE failure" });
  }
};
