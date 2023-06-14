var express = require("express");
var router = express.Router({ mergeParams: true });
const auth = require("../../../middleware");

router.use("/v1/categories", auth, require("./categories"));
router.use("/v1/comments", auth, require("./comments"));
router.use("/v1/order-details", auth, require("./order-details"));
router.use("/v1/orders", auth, require("./orders"));
router.use("/v1/producers", auth, require("./producers"));
router.use("/v1/products", auth, require("./products"));
router.use("/v1/ratings", auth, require("./ratings"));
router.use("/v1/users", auth, require("./users"));
router.use("/v1/statuses", auth, require("./statuses"));

module.exports = router;
