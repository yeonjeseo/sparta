const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost/shopping-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();
const router = express.Router();

app.use("/api", express.urlencoded({ extended: false }), router);
app.use(express.static("assets"));

const postSignUp = async (req, res) => {
  console.log(req.body);
  const { nickname, email, password, confirmPassword } = req.body;

  // compare passwords
  if (password !== confirmPassword)
    return res
      .status(400)
      .send({ errorMessage: "비밀번호가 일치하지 않습니다!!!" });

  //check duplication
  try {
    const isExistingNick = await User.find({ nickname });
    if (isExistingNick.length > 0)
      return res
        .status(400)
        .send({ errorMessage: "이미 존재하는 계정 입니다." });
    const isExistingEmail = await User.find({ email });
    if (isExistingEmail.length > 0)
      return res
        .status(400)
        .send({ errorMessage: "이미 존재하는 이메일 입니다." });

    // create user
    const user = {
      nickname,
      email,
      password,
    };

    await User.create(user);
  } catch (err) {
    return res.status(500).send({ errorMessage: err });
  }

  return res.status(200).send("ㅎㅎㅎ");
};

router.post("/users", postSignUp);

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});
