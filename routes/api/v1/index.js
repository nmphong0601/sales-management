var express = require("express");
var router = express.Router({ mergeParams: true });

router.use("/v1/categories", require("./categories"));
router.use("/v1/comments", require("./comments"));
router.use("/v1/products", require("./products"));

module.exports = router;
