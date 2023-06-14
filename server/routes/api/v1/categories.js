const express = require("express");
const category_router = express.Router({ mergeParams: true });
const categories = require("../../../services/categories");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: The Categories managing API
 */

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
category_router.get("/", function (req, res, next) {
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
 * /api/v1/categories/paging:
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
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of total item per page
 *     responses:
 *       200:
 *         description: The list paging of the catigories
 */
category_router.get("/paging", function (req, res, next) {
  try {
    categories.paged(req.query.page, req.query.pageSize).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

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
category_router.get("/:id", function (req, res, next) {
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
 *   post:
 *     summary: Create a new category
 *     tags:
 *      - Categories
 *     requestBody:
 *       required: true
 *       description: Category object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               CatName:
 *                 type: tring
 *           examples:
 *             Category object example:
 *               sumary: Category object example
 *               value: {CatName: "Category name"}
 *     responses:
 *       200:
 *         description: The category response by id
 */
category_router.post("/", function (req, res, next) {
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
 *   put:
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
 *     requestBody:
 *       required: true
 *       description: Category object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               CatName:
 *                 type: tring
 *           examples:
 *             Category object example:
 *               sumary: Category object example
 *               value: {CatName: "Category name"}
 *     responses:
 *       200:
 *         description: The category response by id
 */
category_router.put("/:id", function (req, res, next) {
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
category_router.delete("/:id", function (req, res, next) {
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

module.exports = category_router;
