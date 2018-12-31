const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// api/products/test
router.get("/test", (req, res) => {
  res.json({ name: "GET api/products/test" });
});

// api/products/display
router.get("/display", (req, res) => {
  // res.json({ name: "GET api/products/display" });

  Product.find({})
    .then(products => res.json(products)) // array
    .catch(err =>
      res.json({
        success: false,
        message: "Unable to retreive products from database."
      })
    );
});

// api/products/add
router.post("/add", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const price = req.body.price;
  const types = req.body.types;
  const image = req.body.image;

  Product.findOne({ "product.name": name }).then(product => {
    // console.log(product);

    if (product)
      return res.json({
        success: false,
        message: "Product name already exits."
      });

    const newProduct = new Product({
      product: {
        name: name,
        price: price,
        types: types,
        image: image
      }
    });

    newProduct
      .save()
      .then(product => res.json(product)) // this is the working version
      // .then(product =>     // need to return the product object above to add to redux products array
      //   res.json({
      //     success: true,
      //     message: "Product added to database."
      //   })
      // )
      .catch(err =>
        res.json({
          success: false,
          message:
            "Product not added to database.  Check all fields required populated."
        })
      );

    // res.json(newProduct);
  });
});

// api/products/display
router.post("/delete/:id", (req, res) => {
  // res.json({ name: "GET api/products/delete/:id" });

  const productId = req.params.id;
  // res.json({ name: productId });
  // res.send("test");

  Product.findByIdAndDelete({ _id: productId }, (err, doc) => {
    // console.log(err);
    // console.log(res); // returns me the product

    if (doc) {
      // returns me the product that was deleted
      res.json({
        success: true,
        message: "ProductId: " + productId + " deleted."
      });
    } else {
      res.json({
        success: false,
        message: "Product id not found."
      });
    }
  });

  // Product.findByIdAndDelete({ _id: productId }, err => {
  //   if (!err) {
  //     res.json({
  //       success: true,
  //       message: "ProductId: " + productId + " deleted."
  //     });
  //   } else {
  //     res.json({
  //       success: false,
  //       message: "Unable to delete productId: " + productId
  //     });
  //   }
  // });

  // res.send("testing");
});

module.exports = router;
