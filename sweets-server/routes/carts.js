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

// // api/carts/delete/:id
// router.post("/delete/:id", (req, res) => {
//   // res.json({ name: "GET api/products/delete/:id" });
//   console.log("here at db product to remove ------", req.params);
//   console.log("here at db payload cartid product associated to ----", req.body);

//   const cartId = req.body.cartIdPlayload;
//   const productId = req.params.id;
//   // res.json({ name: productId });
//   // res.send("test");

// 1 START - Good check to find the specific product and cart id to be deleted
// Cart.find(
//   {
//     _id: cartId,
//     "cartItems.productItem._id": { $eq: productId }

//     // original
//     // _id: cartId,
//     // "cartItems.productItem._id": { $eq: productId }
//   },
//   (err, cart) => {
//     console.log("was product within cart found? ", cart);
//   }
// );
// 1 END

// 2 START
// Cart.findOne(
//   {
//     _id: cartId,
//     "cartItems.productItem._id": { $eq: productId }
//   },

//   (err, product) => {
//     // console.log("-", product);

//     // console.log("---", product.cartItems[0]);

//     // works
//     // let a = product.cartItems.map(product => {
//     //   // return product.productItem.product.name;  // returns [ 'Nama White', 'Nama Milk' ]
//     //   // return product.productItem._id; // return [ '5c37332b85deca08c1f1d556', '5c37334a85deca08c1f1d557' ]
//     //   return product.productItem._id; // return [ '5c37332b85deca08c1f1d556', '5c37334a85deca08c1f1d557' ]
//     // });

//     // let cartItemsArray = product.cartItems.filter(product => {
//     //   return product.productItem._id !== productId; // return [ '5c37332b85deca08c1f1d556', '5c37334a85deca08c1f1d557' ]
//     // });

//     // let a = product.cartItems.map(product => {
//     //   // return product.productItem.product.name;  // returns [ 'Nama White', 'Nama Milk' ]
//     //   // return product.productItem._id; // return [ '5c37332b85deca08c1f1d556', '5c37334a85deca08c1f1d557' ]
//     //   return product.productItem; // return [ '5c37332b85deca08c1f1d556', '5c37334a85deca08c1f1d557' ]
//     // });

//     let a = product.cartItems
//       .map(product => {
//         // return product.productItem.product.name;  // returns [ 'Nama White', 'Nama Milk' ]
//         // return product.productItem._id; // return [ '5c37332b85deca08c1f1d556', '5c37334a85deca08c1f1d557' ]
//         return product.productItem; // return [ '5c37332b85deca08c1f1d556', '5c37334a85deca08c1f1d557' ]
//       })
//       .filter(product => {
//         return product._id !== productId;
//         /*
//           [ { product:
//               { types: 'White',
//                 name: 'Nama White',
//                 price: 25,
//                 image:
//                   'https://www.royce.com/images/pc/english/product/namachocolate/white_m.jpg',
//                 entryDate: '2019-01-10T11:57:31.303Z' },
//               _id: '5c37332b85deca08c1f1d556',
//               __v: 0 } ]
//         */
//       });

//     // console.log(a);

//     const newCartItem = new Cart({
//       cartItems: a
//     });
//     console.log("newCartItem ", newCartItem);

//     // STOPPING HERE NOT WORKING
//     Cart.findOneAndUpdate(
//       {
//         _id: cartId,
//         "cartItems.productItem._id": { $eq: productId }
//       },
//       { $set: { cartItems: newCartItem } },
//       { safe: true, upsert: false, new: true },
//       function(err, cart) {
//         if (err) {
//           res.json({
//             error: {
//               success: false,
//               message:
//                 "Product item Id " +
//                 // cartItem.productItem._id +
//                 " already added to cart or count is less than zero."
//             }
//           });
//         } else {
//           res.json({
//             cart: cart,
//             error: {
//               success: true,
//               message: "New cart item appended to cart in the database."
//             }
//           });
//         }
//       }
//     );

//     // this adds a new one
//     // newCartItem
//     //   .save()
//     //   .then(cart =>
//     //     // cart is an arrray
//     //     res.json({
//     //       cart: cart,
//     //       error: {
//     //         success: true,
//     //         message: "New cart item added to database."
//     //       }
//     //     })
//     //   )
//     //   .catch(err =>
//     //     res.json({
//     //       error: {
//     //         success: false,
//     //         message: "Cart item not added to database. Check cart item sent."
//     //       }
//     //     })
//     //   );

//     // return { blah: a };

//     // console.log("a--", a);
//     // },
//     // (err, test) => {
//     //   console.log("test--", test);

//     /////////////

//     // Cart.findByIdAndDelete(
//     //   {
//     //     // this remove whole cart and not the specific array item
//     //     // _id: cartId,
//     //     // "cartItems.productItem.product._id": { $eq: productId }

//     //     // original
//     //     _id: cartId,
//     //     "cartItems.productItem._id": { $eq: productId }
//     //   },
//     //   // { $pop: { "cartItems.$": productId } }, // works as well // updates the whole object
//     //   // { $pull: { "cartItems.productItem._id": productId } }, // works as well // updates the whole object

//     //   { $set: { "cartItems.$": a } },
//     //   { safe: true, upsert: true, new: true },

//     //   (err, product) => {
//     //     // console.log(err);
//     //     // console.log(res); // returns me the product
//     //     console.log(product);

//     //     if (product) {
//     //       // returns the product that was deleted from the cart
//     //       res.json({
//     //         product: product,
//     //         error: {
//     //           success: true,
//     //           message: "ProductId: " + productId + " deleted."
//     //         }
//     //       });
//     //     } else {
//     //       res.json({
//     //         error: {
//     //           success: false,
//     //           message: "Product id not found."
//     //         }
//     //       });
//     //     }
//     //   }
//     // );

//     ///////////////////
//   }

//   // ,
//   // (err, a) => {
//   //   console.log(a);
//   // }
// );
// 2 END

// Delete the product - ORIGINAL
// Cart.findByIdAndDelete(
//   {
//     // this remove whole cart and not the specific array item
//     // _id: cartId,
//     // "cartItems.productItem.product._id": { $eq: productId }

//     // original
//     _id: cartId,
//     "cartItems.productItem._id": { $eq: productId }
//   },
//   // { $pop: { "cartItems.$": productId } }, // works as well // updates the whole object
//   // { $pull: { "cartItems.productItem._id": productId } }, // works as well // updates the whole object

//   // { safe: true, upsert: true, new: true },

//   (err, product) => {
//     // console.log(err);
//     // console.log(res); // returns me the product
//     console.log(product);

//     if (product) {
//       // returns the product that was deleted from the cart
//       res.json({
//         product: product,
//         error: {
//           success: true,
//           message: "ProductId: " + productId + " deleted."
//         }
//       });
//     } else {
//       res.json({
//         error: {
//           success: false,
//           message: "Product id not found."
//         }
//       });
//     }
//   }
// );
// });

// api/carts/delete/:id
router.post("/delete/:id", (req, res) => {
  // res.json({ name: "GET api/products/delete/:id" });
  console.log("here at db product to remove ------", req.params);
  console.log("here at db payload cartid product associated to ----", req.body);

  const cartId = req.body.cartIdPlayload;
  const productId = req.params.id;
  console.log("cartId    +++", cartId);
  console.log("productId +++", productId);
  // res.send({ response1: test });

  Cart.find(
    {
      _id: cartId
    },
    // { $pull: { "cartItems.productItem._id": { $eq: productId } } }
    // ,{ $pull: { "cartItems.productItem._id": { $eq: productId } } }
    // { $pull: { "cartItems.$": productId } }, // works as well // updates the whole object
    // { $pull: { "cartItems.$": {} } }, // works as well // updates the whole object

    // , { $pull: { "cartItems.productItem._id": { $eq: productId } } },

    (err, product) => {
      // console.log(product[0].cartItems[0]);
      console.log("product-- ", product);
      console.log("product---", product[0]);
      // console.log("product----", product[0].cartItems.productItem._id);// no

      // for (let i in product[0].cartItems) {
      //   console.log(product[0].cartItems[i].productItem._id);  // gives us the product id
      // }

      // let cartFound = product[0].cartItems;
      let cartFound = product[0];
      console.log("cartFound-- ", cartFound);

      // console.log(cartFound[0].productItem._id);
      // console.log(cartFound[1].productItem._id);

      // Remove the cart product from the cart
      let newCartItems = cartFound.cartItems
        .map(product => {
          return product; // return [ '5c37332b85deca08c1f1d556', '5c37334a85deca08c1f1d557' ]
        })
        .filter(productArray => {
          return productArray.productItem._id !== productId;
        });

      console.log("from a--", newCartItems); // object to delete

      // Update the cart with the new cart items list
      ///////START//////
      Cart.findOneAndUpdate(
        {
          _id: cartId
          // "cartItems.productItem._id": { $eq: productId }
        },
        // { $pull: { "cartItems.productItem._id": { $eq: productId } } }
        // ,{ $pull: { "cartItems.productItem._id": { $eq: productId } } }
        // { $pull: { "cartItems.$": productId } }, // works as well // updates the whole object
        // { $pull: { "cartItems.$": {} } }, // works as well // updates the whole object

        { $set: { cartItems: newCartItems } }, // works as well // updates the whole object
        { safe: true, upsert: true, new: true },
        (err, cart) => {
          // res.json(cart);

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

      ///////END//////

      // // console.log(cartFound[0].productItem._id);
      // // console.log(cartFound[1].productItem._id);

      // let productObjToDelete = cartFound
      //   .map(product => {
      //     // return product.productItem.product.name;  // returns [ 'Nama White', 'Nama Milk' ]
      //     // return product.productItem._id; // return [ '5c37332b85deca08c1f1d556', '5c37334a85deca08c1f1d557' ]
      //     return product.productItem; // return [ '5c37332b85deca08c1f1d556', '5c37334a85deca08c1f1d557' ]
      //   })
      //   .filter(product => {
      //     return product._id !== productId;
      //   });

      // console.log("from a--", productObjToDelete); // object to delete

      // Cart.find(
      //   {
      //     productObjToDelete
      //   },
      //   (err, someValue) => {
      //     res.json(someValue);
      //   }
      // );

      // Cart.findOneAndUpdate(
      //   {
      //     _id: cartId,
      //     "cartItems.productItem._id": { $eq: productId }
      //   },
      //   // { $pull: { "cartItems.productItem._id": { $eq: productId } } }
      //   // ,{ $pull: { "cartItems.productItem._id": { $eq: productId } } }
      //   // { $pull: { "cartItems.$": productId } }, // works as well // updates the whole object
      //   // { $pull: { "cartItems.$": {} } }, // works as well // updates the whole object

      //   { $pull: { "cartItems.productItem._id": { $eq: productId } } },
      //   (err, product) => {
      //     res.json(product);
      //   }
      // );
    }

    // ,(err, product) => {
    //   res.json(product);
    // }
  );
});

//   Cart.findOneAndUpdate(
//     {
//       _id: cartId,
//       "cartItems.productItem._id": { $eq: productId }
//     },
//     // { $pull: { "cartItems.productItem._id": { $eq: productId } } }
//     // ,{ $pull: { "cartItems.productItem._id": { $eq: productId } } }
//     // { $pull: { "cartItems.$": productId } }, // works as well // updates the whole object
//     // { $pull: { "cartItems.$": {} } }, // works as well // updates the whole object

//     { $pull: { "cartItems.productItem._id": { $eq: productId } } },
//     (err, product) => {
//       res.json(product);
//     }
//   );

// });

// db.Cart.update(
//   { },
//   { $pull: { "cartItems.productItem._id": { score: 8 , item: "B" } } },
//   { multi: true }
// )

// Cart.findOneAndUpdate(
//   {
//     _id: cartId,
//     "cartItems.productItem._id": { $eq: productId }
//   },
//   // { $pull: { "cartItems.productItem._id": { $eq: productId } } }
//   // ,{ $pull: { "cartItems.productItem._id": { $eq: productId } } }
//   // { $pull: { "cartItems.$": productId } }, // works as well // updates the whole object
//   // { $pull: { "cartItems.$": {} } }, // works as well // updates the whole object

//   { $pull: { "cartItems.productItem._id": { $eq: productId } } },
//   (err, product) => {
//     res.json(product);
//   }
// );

// Cart.update(
//   { $pull: {
//     _id: cartId,
//     "cartItems.productItem._id": { $eq: productId }
//   }},
//   {
//    $unset : {}
//   },
//   { multi: false }
// );

// });

module.exports = router;
