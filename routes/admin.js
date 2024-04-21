const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

//edit product routes
router.get("/edit-product/:productId", adminController.getEditProduct);

//edit produce : route for saving changes : postEditProduct
router.post("/save-changes", adminController.saveChanges);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

module.exports = router;
