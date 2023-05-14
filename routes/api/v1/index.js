var express = require("express");
var router = express.Router();

const categoryRouter = require("./categories");
const productRouter = require("./products");

router.use("/v1/categories", categoryRouter);
router.use("/v1/products", productRouter);

module.exports = router;
