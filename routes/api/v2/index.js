var express = require("express");
var router = express.Router();

const categoryRouter = require("./categories");

router.use("/v2/categories", categoryRouter);

module.exports = router;
