const express = require("express");
const router = express.Router({ mergeParams: true });
const Cart = require("../models/Cart");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Cart.find();
      res.header("Access-Control-Allow-Origin", "*");
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  })
  .post(async (req, res) => {
    try {
      const newGart = await Cart.create({
        ...req.body,
      });
      res.status(201).json(newGart);
    } catch (error) {
      res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  });

module.exports = router;
