const express = require("express");
const order_router = express.Router({ mergeParams: true });
const Orders = require("../../../services/orders");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 */

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Lists all the orders
 *     tags:
 *      - Orders
 *     responses:
 *       200:
 *         description: The list of the orders
 */
order_router.get("/", function (req, res, next) {
  try {
    Orders.all().then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting orders `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/orders/paging:
 *   get:
 *     summary: Lists paging of the orders
 *     tags:
 *      - Orders
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
 *         description: The list paging of the orders
 */
order_router.get("/paging", function (req, res, next) {
  try {
    Orders.paged(req.query.page, req.query.pageSize).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting orders `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags:
 *      - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order response by id
 */
order_router.get("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Orders.single(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting order `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *      - Orders
 *     requestBody:
 *       required: true
 *       description: Order object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               OrderDate:
 *                 type: tring
 *                 description: Date time string format "DD/MM/YYYY HH:mm"
 *               UserID:
 *                 type: integer
 *               Total:
 *                 type: number
 *               SttID:
 *                 type: integer
 *           examples:
 *             Order object example:
 *               sumary: Order object example
 *               value: {OrderDate: "05/06/2023 8:00", UserID: 1, Total: 1000000, SttID: 1}
 *     responses:
 *       200:
 *         description: The order response by id
 */
order_router.post("/", function (req, res, next) {
  try {
    Orders.insert(req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while add order `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   put:
 *     summary: Update the order by id
 *     tags:
 *      - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     requestBody:
 *       required: true
 *       description: Order object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               OrderDate:
 *                 type: tring
 *                 description: Date time string format "DD/MM/YYYY HH:mm"
 *               UserID:
 *                 type: integer
 *               Total:
 *                 type: number
 *               SttID:
 *                 type: integer
 *           examples:
 *             Order object example:
 *               sumary: Order object example
 *               value: {OrderDate: "05/06/2023 8:00", UserID: 1, Total: 1000000, SttID: 1}
 *     responses:
 *       200:
 *         description: The order response by id
 */
order_router.put("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Orders.update(id, req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while update order `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     summary: Delete the order by id
 *     tags:
 *      - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order id
 */
order_router.delete("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Orders.remove(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while delete order `, err.message);
    next(err);
  }
});

module.exports = order_router;
