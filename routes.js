const express = require("express");
const router = express.Router();
const createProduct = require("./controller");



router.route("/create").post(createProduct);
module.exports = router;