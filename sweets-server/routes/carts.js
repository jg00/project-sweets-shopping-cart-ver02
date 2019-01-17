const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// api/carts/test
router.get("/test", (req, res) => {
  res.json({ name: "GET api/carts/test" });
});

// api/carts/init
router.post("/init", (req, res) => {
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
        error: { success: true, message: "Added to cart." }
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

// api/carts/:cartId/add
router.post("/:cartid/add", (req, res) => {
  const cartItem = req.body;
  const cartId = req.params.cartid;

  Cart.findOneAndUpdate(
    {
      _id: cartId,
      "cartItems.productItem._id": { $ne: cartItem.productItem._id }
    },
    { $addToSet: { cartItems: cartItem } },
    { safe: true, upsert: true, new: true },
    function(err, cart) {
      if (err) {
        res.json({
          error: {
            success: false,
            message:
              "Product item Id " +
              cartItem.productItem._id +
              " already added to cart or count is less than zero."
          }
        });
      } else {
        res.json({
          cart: cart,
          error: {
            success: true,
            message: "Added to cart."
          }
        });
      }
    }
  );
});

// api/carts/cart/:id
router.get("/cart/:id", (req, res) => {
  const cartId = req.params.id;

  Cart.findById({ _id: cartId }, (err, cart) => {
    if (cart) {
      res.json({
        cart: cart,
        error: {
          success: true,
          message: null
          // message: "CartID: " + cartId + "  found."
        }
      });
    } else {
      res.json({
        error: {
          success: false,
          message: null
          // message: "Cart id not found."
        }
      });
    }
  });
});

// api/carts/:cartId/update
router.post("/:cartid/update", (req, res) => {
  const cartItem = req.body;
  const cartId = req.params.cartid;

  Cart.findOneAndUpdate(
    {
      _id: cartId,
      "cartItems.productItem._id": { $eq: cartItem.productItem._id }
    },

    { $set: { "cartItems.$": cartItem } }, // updates the whole object

    { safe: true, upsert: true, new: true },
    function(err, cart) {
      if (err) {
        res.json({
          error: {
            success: false,
            message:
              "Product item Id " +
              cartItem.productItem._id +
              " does not exits.  No update."
          }
        });
      } else {
        res.json({
          cart: cart,
          error: {
            success: true,
            message: "Cart item updated."
          }
        });
      }
    }
  );
});

// api/carts/delete/:id
router.post("/delete/:id", (req, res) => {
  const cartId = req.body.cartIdPlayload;
  const productId = req.params.id;

  Cart.find(
    {
      _id: cartId
    },

    (err, product) => {
      let cartFound = product[0];
      console.log("cartFound-- ", cartFound);

      // Remove the cart product from the cart
      let newCartItems = cartFound.cartItems
        .map(product => {
          return product;
        })
        .filter(productArray => {
          return productArray.productItem._id !== productId;
        });

      // Update the cart with the new cart items list
      Cart.findOneAndUpdate(
        {
          _id: cartId
        },

        { $set: { cartItems: newCartItems } }, // updates the whole object
        { safe: true, upsert: true, new: true },
        (err, cart) => {
          if (err) {
            res.json({
              error: {
                success: false,
                message:
                  "Product item Id " +
                  cartItem.productItem._id +
                  " does not exits.  No update."
              }
            });
          } else {
            res.json({
              cart: cart,
              error: {
                success: true,
                message: "Cart item updated."
              }
            });
          }
        }
      );
    }
  );
});

module.exports = router;
