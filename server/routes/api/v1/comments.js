const express = require("express");
const comment_router = express.Router();
const comments = require("../../../services/comments");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The Comments managing API
 */

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
comment_router.get("/", function (req, res, next) {
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
 * /api/v1/comments/paging:
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
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of total item per page
 *     responses:
 *       200:
 *         description: The list paging of the comments
 */
comment_router.get("/paging", function (req, res, next) {
  try {
    comments
      .paged(
        req.query.page,
        req.query.pageSize,
        req.query.where,
        req.query.params
      )
      .then((data) => {
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
    console.error(`Error while getting comments `, err.message);
    next(err);
  }
});

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
comment_router.get("/:id", function (req, res, next) {
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
 *   post:
 *     summary: Create a new comment
 *     tags:
 *      - Comments
 *     requestBody:
 *       required: true
 *       description: Comment object.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: number
 *               Content:
 *                 type: string
 *               ProID:
 *                 type: number
 *           examples:
 *             Comment object example:
 *               sumary: Comment object example
 *               value: {UserID: 1, Content: "User comment content", ProID: 1}
 *     responses:
 *       200:
 *         description: The comment response by id
 */
comment_router.post("/", function (req, res, next) {
  try {
    let data = {
      UserID: req.body["UserID"] || null,
      Content: req.body["Content"] || "",
      Time: "",
      ProID: req.body["ProID"] || null,
    };
    let presentDate = new Date();
    data.Time = `${presentDate.getFullYear()}/${presentDate.getMonth()}/${presentDate.getDate()} ${presentDate.getHours()}:${presentDate.getMinutes()}`;

    comments.insert(data).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while add comment `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   put:
 *     summary: Update the comment by id
 *     tags:
 *      - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     requestBody:
 *       required: true
 *       description: Comment object.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: number
 *               Content:
 *                 type: string
 *               ProID:
 *                 type: number
 *           examples:
 *             Comment object example:
 *               sumary: Comment object example
 *               value: {UserID: 1, Content: "User comment content", ProID: 1}
 *     responses:
 *       200:
 *         description: The comment response by id
 */
comment_router.put("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    let data = {
      UserID: req.body["UserID"] || null,
      Content: req.body["Content"] || "",
      Time: "",
      ProID: req.body["ProID"] || null,
    };
    let presentDate = new Date();
    data.Time = `${presentDate.getFullYear()}/${presentDate.getMonth()}/${presentDate.getDate()} ${presentDate.getHours()}:${presentDate.getMinutes()}`;

    comments.update(id, data).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while update category `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     summary: Delete the comment by id
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
 *         description: The comment id
 */
comment_router.delete("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    comments.remove(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while delete category `, err.message);
    next(err);
  }
});

module.exports = comment_router;
