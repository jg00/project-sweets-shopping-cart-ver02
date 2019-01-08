const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// api/carts/test
router.get("/test", (req, res) => {
  res.json({ name: "GET api/carts/test" });
});

// api/carts/init
router.post("/init", (req, res) => {
  console.log(req.body);

  // const cartItem = req.body.cartItem;
  // const cartItem = [{ t: "test" }];
  const cartItem = req.body;

  const newCartItem = new Cart({
    cartItems: cartItem
  });
  console.log("newCartItem ", newCartItem);

  newCartItem
    .save()
    .then(cart =>
      // cart is an arrray
      res.json({
        cart: cart,
        error: { success: true, message: "New cart item added to database." }
      })
    )
    .catch(err =>
      res.json({
        error: {
          success: false,
          message: "Cart item not added to database. Check cart item sent."
        }
      })
    );

  // res.send("cart init route");
});

// api/carts/add
router.post("/add", (req, res) => {
  console.log(req.body);
  // const cartItem = req.body.cartItem;
  res.send("cart add route");
});

module.exports = router;
