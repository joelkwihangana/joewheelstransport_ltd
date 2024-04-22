const Product = require("../models/product");

//get all products
exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
//add new product
exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

//get all products

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin products",
      path: "admin/products",
    });
  });
};

//edit product
exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      products: product,
      pageTitle: "Edit Product",
      path: "admin/edit-product",
    });
  });
};

// Edit product : controller function to save changes | postEditProduct
exports.saveChanges = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;
  const prodId = productId;
  const updatedTitle = title;
  const updatedPrice = price;
  const updatedImageUrl = imageUrl;
  const updatedDescription = description;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

//delete product by id

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
