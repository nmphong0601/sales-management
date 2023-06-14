const express = require("express");
const producers_router = express.Router({ mergeParams: true });
const Producers = require("../../../services/producers");

/**
 * @swagger
 * tags:
 *   name: Producers
 *   description: The producers managing API
 */

/**
 * @swagger
 * /api/v1/producers:
 *   get:
 *     summary: Lists all the producers
 *     tags:
 *      - Producers
 *     responses:
 *       200:
 *         description: The list of the producers
 */
producers_router.get("/", function (req, res, next) {
  try {
    Producers.all().then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting producers `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/producers/paging:
 *   get:
 *     summary: Lists paging of the producers
 *     tags:
 *      - Producers
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
 *         description: The list paging of the producers
 */
producers_router.get("/paging", function (req, res, next) {
  try {
    Producers.paged(req.query.page, req.query.pageSize).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting producers `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/producers/{id}:
 *   get:
 *     summary: Get the producer by id
 *     tags:
 *      - Producers
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The producer id
 *     responses:
 *       200:
 *         description: The producer response by id
 */
producers_router.get("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Producers.single(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting producer `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/producers:
 *   post:
 *     summary: Create a new producer
 *     tags:
 *      - Producers
 *     requestBody:
 *       required: true
 *       description: producer object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               ProducerName:
 *                 type: tring
 *           examples:
 *             Producer object example:
 *               sumary: Producer object example
 *               value: {ProducerName: "ProducerName name"}
 *     responses:
 *       200:
 *         description: The producer response by id
 */
producers_router.post("/", function (req, res, next) {
  try {
    Producers.insert(req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while add producer `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/producers/{id}:
 *   put:
 *     summary: Update the producer by id
 *     tags:
 *      - Producers
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     requestBody:
 *       required: true
 *       description: producer object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               ProducerName:
 *                 type: tring
 *           examples:
 *             Producer object example:
 *               sumary: Producer object example
 *               value: {ProducerName: "ProducerName name"}
 *     responses:
 *       200:
 *         description: The producer response by id
 */
producers_router.put("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Producers.update(id, req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while update producer `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/producers/{id}:
 *   delete:
 *     summary: Delete the producer by id
 *     tags:
 *      - Producers
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The producer id
 *     responses:
 *       200:
 *         description: The producer id
 */
producers_router.delete("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Producers.remove(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while delete producer `, err.message);
    next(err);
  }
});

module.exports = producers_router;
