const express = require("express");
const router = express.Router();
const products = require("../../../services/products");

/* GET products listing. */
router.get("/", function (req, res, next) {
  try {
    products.all().then(data => {
        res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

/* GET products paged listing. */
router.get("/page", function (req, res, next) {
  try {
    products.paged(req.query.page).then(data => {
        res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

module.exports = router;
