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

// NEED TO WORK ON THIS PART**************
// api/carts/:cartid/add
router.post("/:cartid/add", (req, res) => {
  // console.log(req.body);
  const cartId = req.params.cartid;
  // console.log(cartId);
  // const cartItem = req.body.cartItem;
  // res.send("cart add route");

  // TESTING BELOW
  const cartItem = req.body;

  const newCartItem = new Cart({
    cartItems: cartItem
  });
  console.log("newCartItem ", newCartItem);

  // newCartItem
  //   .save()
  //   .then(cart =>
  //     // cart is an arrray
  //     res.json({
  //       cart: cart,
  //       error: { success: true, message: "New cart item added to database." }
  //     })
  //   )
  //   .catch(err =>
  //     res.json({
  //       error: {
  //         success: false,
  //         message: "Cart item not added to database. Check cart item sent."
  //       }
  //     })
  //   );
});

/* NEW SCTION*/
// api/carts/cart/:id
router.get("/cart/:id", (req, res) => {
  // res.json({ name: "GET api/products/delete/:id" });

  const cartId = req.params.id;
  // res.json({ name: productId });
  // res.send("test");

  Cart.findById({ _id: cartId }, (err, cart) => {
    console.log(cart); // returns cart

    if (cart) {
      // returns the cart by id
      res.json({
        cart: cart,
        error: {
          success: true,
          message: "CartID: " + cartId + "  found."
        }
      });
    } else {
      res.json({
        error: {
          success: false,
          message: "Cart id not found."
        }
      });
    }
  });
});

module.exports = router;
