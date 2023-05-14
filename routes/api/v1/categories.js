const express = require("express");
const router = express.Router();
const categories = require("../../../services/categories");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: The Categories managing API
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get the category by id
 *     tags: 
 *      - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category response by id
 */
router.get("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    categories.single(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Lists all the catigories
 *     tags: 
 *      - Categories
 *     responses:
 *       200:
 *         description: The list of the catigories
 */
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

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Lists paging of the catigories
 *     tags: 
 *      - Categories
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The number of page
 *     responses:
 *       200:
 *         description: The list paging of the catigories
 */
router.get("/", function (req, res, next) {
  try {
    categories.paged(req.query.page).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: 
 *      - Categories
 *     parameters:
 *       - name: CatName
 *         description: The category name.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The category response by id
 */
router.post("/", function (req, res, next) {
  try {
    categories.insert(req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while add category `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   post:
 *     summary: Update the category by id
 *     tags: 
 *      - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *       - name: CatName
 *         description: Category's name.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The category id
 */
router.put("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    categories.update(id, req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while update category `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete the category by id
 *     tags: 
 *      - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category id
 */
router.delete("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    categories.remove(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while delete category `, err.message);
    next(err);
  }
});

module.exports = router;
