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
  return res.status(200).send({ result: "READ all success", comments });
};

// CRUD : U
export const patchComment = async (req, res) => {
  const { title, comment, password } = req.body;
  const { id } = req.params;

  const post = await Post.findById(id);
  // compare pw
  const isMatched = await bcrypt.compare(password, post.password);
  // const isMatched =  bcrypt.compareSync(password, post.password);

  if (isMatched) {
    try {
      await Post.updateOne(post, {
        $set: {
          title,
          comment,
        },
      });
      return res
        .status(200)
        .send({ result: "UPDATE success", msg: "수정 완료되었습니다." });
    } catch (err) {
      return res.status(400).send({ result: "UPDATE failure", msg: err });
    }
  } else {
    return res
      .status(400)
      .send({ result: "UPDATE failure", msg: "비밀번호가 일치하지 않습니다." });
  }
};

// CRUD : D
export const deleteComment = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  const post = await Post.findById(id);

  const isMatched = await bcrypt.compare(password, post.password);

  if (isMatched) {
    try {
      await Post.deleteOne(post);
      // await Post.findByIdAndRemove(id);
      return res
        .status(200)
        .send({ result: "DELETE success", msg: "삭제 완료되었습니다." });
    } catch {
      return res
        .status(400)
        .send({ result: "DELETE failure", msg: "삭제 실패했습니다." });
    }
  } else {
    return res
      .status(400)
      .send({ result: "DELETE failure", msg: "비밀번호가 일치하지 않습니다." });
  }
};
