const express = require("express");
const router = express.Router();
const comments = require("../../../services/comments");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The Comments managing API
 */

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   get:
 *     summary: Get the comment by id
 *     tags: 
 *      - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment response by id
 */
router.get("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    comments.single(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting comments `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     summary: Lists all the comments
 *     tags: 
 *      - Comments
 *     responses:
 *       200:
 *         description: The list of the comments
 */
router.get("/", function (req, res, next) {
  try {
    comments.all().then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting comments `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     summary: Lists paging of the comments
 *     tags: 
 *      - Comments
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The number of page
 *     responses:
 *       200:
 *         description: The list paging of the comments
 */
router.get("/page", function (req, res, next) {
  try {
    comments.paged(req.query.page).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting comments `, err.message);
    next(err);
  }
});

module.exports = router;
