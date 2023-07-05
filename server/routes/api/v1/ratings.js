const express = require("express");
const rating_router = express.Router({ mergeParams: true });
const Ratings = require("../../../services/ratings");

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: The ratings managing API
 */

/**
 * @swagger
 * /api/v1/ratings:
 *   get:
 *     summary: Lists all the ratings
 *     tags:
 *      - Ratings
 *     responses:
 *       200:
 *         description: The list of the ratings
 */
rating_router.get("/", function (req, res, next) {
  try {
    Ratings.all().then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting ratings `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/ratings/paging:
 *   get:
 *     summary: Lists paging of the ratings
 *     tags:
 *      - Ratings
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
 *         description: The list paging of the ratings
 */
rating_router.get("/paging", function (req, res, next) {
  try {
    Ratings.paged(
      req.query.page,
      req.query.pageSize,
      req.query.where,
      req.query.params
    ).then((data) => {
      res.json({
        pagingInfor: {
          page: Number(req.query.page),
          pageSize: Number(req.query.pageSize),
          search: req.query.where,
          params: req.query.params,
          totalItems: Number(data[0].totalRows),
        },
        items: data,
      });
    });
  } catch (err) {
    console.error(`Error while getting ratings `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/ratings/{id}:
 *   get:
 *     summary: Get the rating by id
 *     tags:
 *      - Ratings
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The rating id
 *     responses:
 *       200:
 *         description: The rating response by id
 */
rating_router.get("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Ratings.single(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting rating `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/ratings:
 *   post:
 *     summary: Create a new status
 *     tags:
 *      - Ratings
 *     requestBody:
 *       required: true
 *       description: rating object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               ProID:
 *                 type: integer
 *               One:
 *                 type: integer
 *               Two:
 *                 type: integer
 *               Three:
 *                 type: integer
 *               Four:
 *                 type: integer
 *               Five:
 *                 type: integer
 *               Rate:
 *                 type: integer
 *           examples:
 *             Rating object example:
 *               sumary: rating object example
 *               value: {ProID: 1, One: 1, Two: 1, Three: 1, Four: 1, Five: 1}
 *     responses:
 *       200:
 *         description: The rating response by id
 */
rating_router.post("/", function (req, res, next) {
  try {
    Ratings.insert(req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while add rating `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/ratings/{id}:
 *   put:
 *     summary: Update the rating by id
 *     tags:
 *      - Ratings
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     requestBody:
 *       required: true
 *       description: rating object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               ProID:
 *                 type: integer
 *               One:
 *                 type: integer
 *               Two:
 *                 type: integer
 *               Three:
 *                 type: integer
 *               Four:
 *                 type: integer
 *               Five:
 *                 type: integer
 *               Rate:
 *                 type: integer
 *           examples:
 *             Rating object example:
 *               sumary: rating object example
 *               value: {ProID: 1, One: 1, Two: 1, Three: 1, Four: 1, Five: 1}
 *     responses:
 *       200:
 *         description: The rating response by id
 */
rating_router.put("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Ratings.update(id, req.body).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while update rating `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/ratings/{id}:
 *   delete:
 *     summary: Delete the rating by id
 *     tags:
 *      - Ratings
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The rating id
 *     responses:
 *       200:
 *         description: The rating id
 */
rating_router.delete("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Ratings.remove(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while delete rating `, err.message);
    next(err);
  }
});

module.exports = rating_router;
