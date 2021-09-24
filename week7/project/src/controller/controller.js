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
// export const
