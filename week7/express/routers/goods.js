const express = require("express");
const Goods = require("../schemas/Goods");
const Cart = require("../schemas/cart");
const router = express.Router();

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
  // try {
  //   await Cart.findOneAndUpdate({ goodsId }, { $set: { quantity } });
  //   res.send({ result: "success" });
  // } catch {
  //   console.log("Error!");
  //   res.end();
  // }
});
module.exports = router;
