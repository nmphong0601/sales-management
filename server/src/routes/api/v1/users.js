require("dotenv").config();
const express = require("express");
const user_router = express.Router({ mergeParams: true });
const Users = require("../../../services/users");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Lists all the users
 *     tags:
 *      - Users
 *     responses:
 *       200:
 *         description: The list of the users
 */
user_router.get("/", function (req, res, next) {
  try {
    Users.all().then((data) => {
      data = data.map((item) => {
        var mappedData = {
          Id: item["Id"],
          f_Username: item["f_Username"],
          f_Name: item["f_Name"],
          f_Email: item["f_Email"],
          f_DOB: item["f_DOB"],
          f_Permission: item["f_Permission"],
          f_Address: item["f_Address"],
          f_Phone: item["f_Phone"],
        };

        return mappedData;
      });

      res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/users/paging:
 *   get:
 *     summary: Lists paging of the users
 *     tags:
 *      - Users
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
 *         description: The list paging of the users
 */
user_router.get("/paging", function (req, res, next) {
  try {
    Users.paged(
      req.query.page,
      req.query.pageSize,
      req.query.where,
      req.query.params
    ).then((data) => {
      data = data.map((item) => {
        var mappedData = {
          Id: item["Id"],
          f_Username: item["f_Username"],
          f_Name: item["f_Name"],
          f_Email: item["f_Email"],
          f_DOB: item["f_DOB"],
          f_Permission: item["f_Permission"],
          f_Address: item["f_Address"],
          f_Phone: item["f_Phone"],
          totalRows: item["totalRows"],
        };

        return mappedData;
      });

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
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 */
user_router.get("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Users.single(id).then((data) => {
      var responseData = {
        Id: data["Id"],
        f_Username: data["f_Username"],
        f_Name: data["f_Name"],
        f_Email: data["f_Email"],
        f_DOB: data["f_DOB"],
        f_Permission: data["f_Permission"],
        f_Address: data["f_Address"],
        f_Phone: data["f_Phone"],
      };
      res.json(responseData);
    });
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *      - Users
 *     requestBody:
 *       required: true
 *       description: User object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               f_Username:
 *                 type: string
 *               f_Password:
 *                 type: string
 *               f_Name:
 *                 type: string
 *               f_Email:
 *                 type: string
 *               f_DOB:
 *                 type: string
 *                 description: Date time string format "DD/MM/YYYY"
 *               f_Permission:
 *                 type: integer
 *                 description: 1 - Admin, 0 - Customer
 *               f_Address:
 *                 type: string
 *               f_Phone:
 *                 type: string
 *           examples:
 *             User object example:
 *               sumary: User object example
 *               value: {f_Username: "User name", f_Password: "123456", f_Name: "Full name", f_Email: "username@gmail.com", f_DOB: "30/01/1990", f_Permission: 0, f_Address: "User address", f_Phone: "0978782398"}
 *     responses:
 *       200:
 *         description: The user response by id
 */
user_router.post("/", function (req, res, next) {
  try {
    var salt = bcrypt.genSaltSync(12);
    var pHash = bcrypt.hashSync(req.body["f_Password"] || "123456", salt);

    let data = {
      f_Username: req.body["f_Username"] || "",
      f_Password: pHash,
      f_Name: req.body["f_Name"] || "",
      f_Email: req.body["f_Email"] || "",
      f_DOB: req.body["f_DOB"] || "",
      f_Permission: req.body["f_Permission"] || 0,
      f_Address: req.body["f_Address"] || "",
      f_Phone: req.body["f_Phone"] || "",
      f_Salt: salt,
    };

    Users.insert(data).then((data) => {
      var mappedData = {
        Id: data["Id"],
        f_Username: data["f_Username"],
        f_Name: data["f_Name"],
        f_Email: data["f_Email"],
        f_DOB: data["f_DOB"],
        f_Permission: data["f_Permission"],
        f_Address: data["f_Address"],
        f_Phone: data["f_Phone"],
      };
      res.json(mappedData);
    });
  } catch (err) {
    console.error(`Error while add user `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update the user by id
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     requestBody:
 *       required: true
 *       description: User object.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               f_Username:
 *                 type: string
 *               f_Password:
 *                 type: string
 *               f_Name:
 *                 type: string
 *               f_Email:
 *                 type: string
 *               f_DOB:
 *                 type: string
 *                 description: Date time string format "DD/MM/YYYY"
 *               f_Permission:
 *                 type: integer
 *                 description: 1 - Admin, 0 - Customer
 *               f_Address:
 *                 type: string
 *               f_Phone:
 *                 type: string
 *           examples:
 *             User object example:
 *               sumary: User object example
 *               value: {f_Username: "User name", f_Password: "123456", f_Name: "Full name", f_Email: "username@gmail.com", f_DOB: "30/01/1990", f_Permission: 0, f_Address: "User address", f_Phone: "0978782398"}
 *     responses:
 *       200:
 *         description: The user response by id
 */
user_router.put("/:id", function (req, res, next) {
  try {
    var salt = bcrypt.genSaltSync(12);
    var pHash = bcrypt.hashSync(req.body["f_Password"] || "123456", salt);

    let id = req.params.id;
    let data = {
      f_Username: req.body["f_Username"] || "",
      f_Password: pHash,
      f_Name: req.body["f_Name"] || "",
      f_Email: req.body["f_Email"] || "",
      f_DOB: req.body["f_DOB"] || "",
      f_Permission: req.body["f_Permission"] || 0,
      f_Address: req.body["f_Address"] || "",
      f_Phone: req.body["f_Phone"] || "",
      f_Salt: salt,
    };

    Users.update(id, data).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while update user `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete the user by id
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user id
 */
user_router.delete("/:id", function (req, res, next) {
  try {
    let id = req.params.id;
    Users.remove(id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.error(`Error while delete user `, err.message);
    next(err);
  }
});

module.exports = user_router;
