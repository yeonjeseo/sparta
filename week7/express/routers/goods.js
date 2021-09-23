const express = require("express");
const Goods = require("../schemas/Goods");
const Cart = require("../schemas/cart");
const router = express.Router();

const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite");
const url = "http://www.yes24.com/24/Category/BestSeller";

//////
router.get("/goods/add/crawling", async (req, res) => {
  try {
    await axios({
      url: url,
      method: "GET",
      responseType: "arraybuffer",
    }).then(async (html) => {
      const content = iconv.decode(html.data, "EUC-KR").toString();
      const $ = cheerio.load(content);
      const list = $("ol li");
      // console.log(list);
      await list.each(async (i, tag) => {
        // p 태그이면서 copy 클래스를 가진 요소의 자식들 중 a 태그 요소
        let desc = $(tag).find("p.copy a").text();
        let image = $(tag).find("p.image a img").attr("src");
        let title = $(tag).find("p.image a img").attr("alt");
        let price = $(tag).find("p.price strong").text();
        console.log(desc, image, title, price);
      });
    });
    res.send({ result: "success", message: "크롤링이 완료 되었습니다." });
  } catch (error) {
    console.log(error);
    res.send({
      result: "fail",
      message: "크롤링에 문제가 발생했습니다",
      error: error,
    });
  }
});
//////

router.get("/goods", async (req, res, next) => {
  try {
    const { category } = req.query;
    const goods = await Goods.find({ category }).sort("-goodsId");
    // res.json({ goods: goods });
    res.json({ goods });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;
  goods = await Goods.findOne({ goodsId: goodsId });
  res.json({ detail: goods });
});

router.post("/goods", async (req, res) => {
  const goods = req.body;
  console.log(req.body);

  // goods.forEach(async (good) => {
  //   const { goodsId, name, thumbnailUrl, category, price } = good;
  //   isExist = await Goods.find({ goodsId });
  //   if (isExist.length == 0) {
  //     await Goods.create({ goodsId, name, thumbnailUrl, category, price });
  //   }
  // });
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  isExist = await Goods.find({ goodsId });
  if (isExist.length == 0) {
    await Goods.create({ goodsId, name, thumbnailUrl, category, price });
  }
  res.send({ result: "success" });
});

router.post("/goods/:goodsId/cart", async (req, res) => {
  //url parameter :goodsId
  const { goodsId } = req.params;
  //ajax body
  const { quantity } = req.body;

  isCart = await Cart.find({ goodsId });
  console.log(isCart, quantity);
  if (isCart.length) {
    //modify if already exists
    await Cart.updateOne({ goodsId }, { $set: { quantity } });
  } else {
    // create if not exists
    await Cart.create({ goodsId: goodsId, quantity: quantity });
  }
  res.send({ result: "success" });
});

router.get("/cart", async (req, res) => {
  const cart = await Cart.find({});
  const goodsId = cart.map((cart) => cart.goodsId);

  goodsInCart = await Goods.find().where("goodsId").in(goodsId);

  concatCart = cart.map((c) => {
    for (let i = 0; i < goodsInCart.length; i++) {
      if (goodsInCart[i].goodsId == c.goodsId) {
        return { quantity: c.quantity, goods: goodsInCart[i] };
      }
    }
  });

  res.json({
    cart: concatCart,
  });
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const isGoodsInCart = await Cart.find({ goodsId });
  console.log(isGoodsInCart);
  if (isGoodsInCart.length > 0) {
    await Cart.deleteOne({ goodsId });
  }

  res.send({ result: "success" });
});

router.patch("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const isGoodsInCart = await Cart.findOne({ goodsId });
  if (isGoodsInCart.length > 0) {
    await Cart.updateOne({ $set: { quantity } });
  }

  res.send({ result: "success", msg: "수량 변경 완료" });
});

module.exports = router;
