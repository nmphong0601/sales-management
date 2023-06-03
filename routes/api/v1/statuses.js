const express = require("express");
const status_router = express.Router({ mergeParams: true });
const Statuses = require("../../../services/statuses");

/**
 * @swagger
 * tags:
 *   name: Statuses
 *   description: The statuses managing API
 */

/**
 * @swagger
 * /api/v1/statuses:
 *   get:
 *     summary: Lists all the statuses
 *     tags:
 *      - Statuses
 *     responses:
 *       200:
 *         description: The list of the statuses
 */
status_router.get("/", function (req, res, next) {
  try {
    Statuses.all().then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting statuses `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/statuses/paging:
 *   get:
 *     summary: Lists paging of the statuses
 *     tags:
 *      - Statuses
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
 *         description: The list paging of the statuses
 */
status_router.get("/paging", function (req, res, next) {
  try {
    Statuses.paged(req.query.page, req.query.pageSize).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting statuses `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/statuses/{id}:
 *   get:
 *     summary: Get the status by id
 *     tags:
 *      - Statuses
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The status id
 *     responses:
 *       200:
 *         description: The status response by id
 */
status_router.get("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Statuses.single(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting status `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/statuses:
 *   post:
 *     summary: Create a new status
 *     tags:
 *      - Statuses
 *     requestBody:
 *       required: true
 *       description: Status object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               SttName:
 *                 type: string
 *           examples:
 *             Status object example:
 *               sumary: Status object example
 *               value: {SttName: "Status name"}
 *     responses:
 *       200:
 *         description: The status response by id
 */
status_router.post("/", function (req, res, next) {
  try {
    Statuses.insert(req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while add status `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/statuses/{id}:
 *   put:
 *     summary: Update the status by id
 *     tags:
 *      - Statuses
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     requestBody:
 *       required: true
 *       description: Status object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               SttName:
 *                 type: string
 *           examples:
 *             Status object example:
 *               sumary: Status object example
 *               value: {SttName: "Status name"}
 *     responses:
 *       200:
 *         description: The status response by id
 */
status_router.put("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Statuses.update(id, req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while update status `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/statuses/{id}:
 *   delete:
 *     summary: Delete the status by id
 *     tags:
 *      - Statuses
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The status id
 *     responses:
 *       200:
 *         description: The status id
 */
status_router.delete("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Statuses.remove(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while delete status `, err.message);
    next(err);
  }
});

module.exports = status_router;
