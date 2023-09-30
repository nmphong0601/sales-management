const express = require("express");
const router = express.Router();
const categories = require("../../../services/categories");

/* GET products listing. */
router.get("/", function (req, res, next) {
  try {
    categories.all().then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

/* GET products paged listing. */
router.get("/page", function (req, res, next) {
  try {
    products.paged(req.query.page).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

module.exports = router;
