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

// This will be for adding Cart.CartItems array for a specific cart //
// api/carts/:cartId/add
router.post("/:cartid/add", (req, res) => {
  // console.log(req.body);
  const cartItem = req.body;
  const cartId = req.params.cartid;
  // console.log("At api/carts/:cartid/add route: ", cartId);
  // res.send("api/carts/:cartid/add testing");

  /*
    1 find the cart id
    2 concat new item to the cartItems Array
    
  */

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
            message: "New cart item appended to cart in the database."
          }
        });
      }
    }
  );
});

/*
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
*/

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

// ******* NEW ****  //

// This will be for updating Cart.CartItems array for a specific cart //
// api/carts/:cartId/update
router.post("/:cartid/update", (req, res) => {
  const cartItem = req.body;
  const cartId = req.params.cartid;
  console.log(cartItem);
  console.log(cartId);
  console.log(cartItem.productItem._id);

  // Cart.findById({ _id: cartId }, (err, cart) => {
  //   // console.log("found: ", cart);
  //   console.log(cart.cartItems[0].counter);  // should look like this.
  // });

  // Cart.find(
  //   {
  //     _id: cartId,
  //     "cartItems.productItem.counter": { $elemMatch: { counter: 3 } }
  //     // "cartItems.productItem._id": { $eq: cartItem.productItem._id }
  //   },
  //   (err, cart) => {
  //     console.log(cart);
  //     // for (item in cart.cartitems) {
  //     //   console.log(item._id);
  //     // }
  //   }
  // );

  // "cartItems.productItem._id": { $eq: cartItem.productItem._id }

  // console.log(Cart.cartItems);
  // console.log("At api/carts/:cartid/add route: ", cartId);
  // res.send("api/carts/:cartid/add testing");

  /*
    1 find the cart id
    2 concat new item to the cartItems Array
    
    { counter: 14,
      productItem:
      { product:
          { types: 'Bitter',
            name: 'Nama Bitter',
            price: 60,
            image:
            'https://www.royce.com/images/pc/english/product/namachocolate/ghanabitter_m.jpg',
            entryDate: '2019-01-10T15:41:18.723Z' },
        _id: '5c37679e33388e02035bb3c5',
        __v: 0 },
      localCart: '5c3767db33388e02035bb3c6' }

    5c3767db33388e02035bb3c6
  */

  Cart.findOneAndUpdate(
    {
      _id: cartId,
      "cartItems.productItem._id": { $eq: cartItem.productItem._id }
      // "cartItems.productItem._id": { $eq: cartItem.productItem._id } // original
    },
    // { $set: { cartItems: cartItem } }, // updates whole cartItem  // original
    { $set: { "cartItems.$": cartItem } }, // works as well // updates the whole object
    // { $set: { "cartItems.$.counter": cartItem.counter } },  // works as well
    // { $set: { "cartItems.$.counter": 101 } },  // looks to be working
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
            message: "Cart item updated in the database."
          }
        });
      }
    }
  );
});

module.exports = router;
