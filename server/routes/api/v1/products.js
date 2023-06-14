const express = require("express");
const product_router = express.Router({ mergeParams: true });
const products = require("../../../services/products");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Lists all the products
 *     tags:
 *      - Products
 *     responses:
 *       200:
 *         description: The list of the products
 */
product_router.get("/", function (req, res, next) {
  try {
    products.all().then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/products/paging:
 *   get:
 *     summary: Lists paging of the products
 *     tags:
 *      - Products
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
 *         description: The list paging of the products
 */
product_router.get("/paging", function (req, res, next) {
  try {
    products.paged(req.query.page, req.query.pageSize).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags:
 *      - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product response by id
 */
product_router.get("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    products.single(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *      - Products
 *     requestBody:
 *       required: true
 *       description: Product object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               ProName:
 *                 type: tring
 *               TinyDes:
 *                 type: string
 *               FullDes:
 *                 type: string
 *               Price:
 *                 type: integer
 *               ProducerID:
 *                 type: integer
 *               Quantity:
 *                 type: integer
 *               View:
 *                 type: integer
 *               MadeIn:
 *                 type: string
 *               CatID:
 *                 type: integer
 *               ReceipDate:
 *                 type: string
 *                 description: Datetime string format "DD/MM/YYYY"
 *               Orders:
 *                 type: integer
 *           examples:
 *             Product object example:
 *               sumary: Product object example
 *               value: {ProName: "Product name", TinyDes: "", FullDes: "", Price: 1000000, ProducerID: 1, Quantity: 1000, View: 50, MadeIn: "Vietnam", CatID: 1, ReceipDate: "05/06/2023", Orders: 60}
 *     responses:
 *       200:
 *         description: The category response by id
 */
product_router.post("/", function (req, res, next) {
  try {
    products.insert(req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while add category `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update the product by id
 *     tags:
 *      - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       description: Product object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               ProName:
 *                 type: tring
 *               TinyDes:
 *                 type: string
 *               FullDes:
 *                 type: string
 *               Price:
 *                 type: integer
 *               ProducerID:
 *                 type: integer
 *               Quantity:
 *                 type: integer
 *               View:
 *                 type: integer
 *               MadeIn:
 *                 type: string
 *               CatID:
 *                 type: integer
 *               ReceipDate:
 *                 type: string
 *                 description: Datetime string format "DD/MM/YYYY"
 *               Orders:
 *                 type: integer
 *           examples:
 *             Product object example:
 *               sumary: Product object example
 *               value: {ProName: "Product name", TinyDes: "", FullDes: "", Price: 1000000, ProducerID: 1, Quantity: 1000, View: 50, MadeIn: "Vietnam", CatID: 1, ReceipDate: "05/06/2023", Orders: 60}
 *     responses:
 *       200:
 *         description: The product response by id
 */
product_router.put("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    products.update(id, req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while update product `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete the product by id
 *     tags:
 *      - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product id
 */
product_router.delete("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    products.remove(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while delete product `, err.message);
    next(err);
  }
});

module.exports = product_router;