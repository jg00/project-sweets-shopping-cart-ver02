const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// api/carts/test
router.get("/test", (req, res) => {
  res.json({ name: "GET api/carts/test" });
});

// api/carts/add
router.post("/add", (req, res) => {
  console.log(req.body);

  // const cartItem = req.body.cartItem;
  res.send("test");
});

module.exports = router;
