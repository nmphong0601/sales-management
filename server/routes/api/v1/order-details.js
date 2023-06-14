const express = require("express");
const order_detail_router = express.Router({ mergeParams: true });
const OrderDetails = require("../../../services/order-details");

/**
 * @swagger
 * tags:
 *   name: OrderDetails
 *   description: The Order Detail managing API
 */

/**
 * @swagger
 * /api/v1/order-details:
 *   get:
 *     summary: Lists all the order detail
 *     tags:
 *      - OrderDetails
 *     responses:
 *       200:
 *         description: The list of the order detail
 */
order_detail_router.get("/", function (req, res, next) {
  try {
    OrderDetails.all().then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting OrderDetails `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/order-details/paging:
 *   get:
 *     summary: Lists paging of the order detail
 *     tags:
 *      - OrderDetails
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
 *         description: The list paging of the order detail
 */
order_detail_router.get("/paging", function (req, res, next) {
  try {
    OrderDetails.paged(req.query.page, req.query.pageSize).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting Order Details`, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/order-details/{id}:
 *   get:
 *     summary: Get the order detail by id
 *     tags:
 *      - OrderDetails
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order detail id
 *     responses:
 *       200:
 *         description: The order detail response by id
 */
order_detail_router.get("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    OrderDetails.single(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting Order Detail `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/order-details:
 *   post:
 *     summary: Create a new order detail
 *     tags:
 *      - OrderDetails
 *     requestBody:
 *       required: true
 *       description: Order detail object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               OrderID:
 *                 type: integer
 *               ProID:
 *                 type: integer
 *               Quantity:
 *                 type: integer
 *               Price:
 *                 type: number
 *               Amount:
 *                 type: number
 *           examples:
 *             Category object example:
 *               sumary: Order detail object example
 *               value: {OrderID: 1, ProID: 1, Quantity: 10, Price: 1000000, Amount: 1000000}
 *     responses:
 *       200:
 *         description: The order detail response by id
 */
order_detail_router.post("/", function (req, res, next) {
  try {
    OrderDetails.insert(req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while add order detail `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/order-details/{id}:
 *   put:
 *     summary: Update the order detail by id
 *     tags:
 *      - OrderDetails
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order detail id
 *     requestBody:
 *       required: true
 *       description: Order detail object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               OrderID:
 *                 type: integer
 *               ProID:
 *                 type: integer
 *               Quantity:
 *                 type: integer
 *               Price:
 *                 type: number
 *               Amount:
 *                 type: number
 *           examples:
 *             Category object example:
 *               sumary: Order detail object example
 *               value: {OrderID: 1, ProID: 1, Quantity: 10, Price: 1000000, Amount: 1000000}
 *     responses:
 *       200:
 *         description: The order detail response by id
 */
order_detail_router.put("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    OrderDetails.update(id, req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while update order detail `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/order-details/{id}:
 *   delete:
 *     summary: Delete the category by id
 *     tags:
 *      - OrderDetails
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order detail id
 *     responses:
 *       200:
 *         description: The order detail id
 */
order_detail_router.delete("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    OrderDetails.remove(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while delete order detail `, err.message);
    next(err);
  }
});

module.exports = order_detail_router;
