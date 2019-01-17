const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// api/products/test
router.get("/test", (req, res) => {
  res.json({ name: "GET api/products/test" });
});

// api/products/display
router.get("/display", (req, res) => {
  Product.find({})
    .then(products =>
      res.json({
        products: products,
        error: {
          success: true,
          message: ""
          // message: "Product list returned from database."
        }
      })
    ) // array
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
        error: {
          success: false,
          message: "Product name already exits."
        }
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
      // .then(product => res.json(product)) // this is the working version
      .then(product =>
        res.json({
          product: product,
          error: { success: true, message: "New product added to database." }
        })
      )
      .catch(err =>
        res.json({
          error: {
            success: false,
            message:
              "Product not added to database.  Check all fields required populated."
          }
        })
      );
  });
});

// api/products/delete/:id
router.post("/delete/:id", (req, res) => {
  const productId = req.params.id;

  Product.findByIdAndDelete({ _id: productId }, (err, product) => {
    if (product) {
      // returns the product that was deleted
      res.json({
        product: product,
        error: {
          success: true,
          message: "ProductId: " + productId + " deleted."
        }
      });
    } else {
      res.json({
        error: {
          success: false,
          message: "Product id not found."
        }
      });
    }
  });
});

module.exports = router;
